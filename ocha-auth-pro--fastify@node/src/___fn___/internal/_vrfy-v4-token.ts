import { type FastifyReply } from "fastify"
import { V4 } from "paseto"
import { ErrorDefensiveGuardBreach, ErrorSuspiciousActivity } from "../../___error___/index.js"

/**
 * Verifies a Paseto V4 token and handles expiration or tampering gracefully.
 *
 * - Returns the decrypted token object if valid
 * - Sends a soft fail (500 response) if token is expired in acceptable cases (like RPT)
 * - Throws `ErrorSuspiciousActivity` or `ErrorDefensiveGuardBreach` for other violations
 */
export const vrfyV4Token = async (reply: FastifyReply, v4Token: string, key: string, userIdentifier: string, tokenName: "at" | "rt" | "rpt" | "rptUserObj" | "uet" | "sut") => {
  try {
    const decryptedV4Obj = await V4.verify(v4Token, key)
    return decryptedV4Obj
  } catch (err: any) {
    // There are 7 known errors that Paseto could throw during runtime.
    // Here, 5 are covered explicitly.
    // Other 2 errors are `TypeError` and `PasetoError` which is the base error others inherit from.
    switch (err.code) {
      // One of the claims (e.g. exp) is invalid
      // ⚠️ Handle expiration differently depending on token type
      case "ERR_PASETO_CLAIM_INVALID": {
        // ▶ RPT (Reset Password Token) & UET (Update Email Token) & SUT (Sign-In Token)
        // Token expiration is expected UX behavior
        if (tokenName === "rpt") return reply.status(401).send({ success: false, code: "ERR_RPT_EXPIRED" })
        else if (tokenName === "uet") return reply.status(401).send({ success: false, code: "ERR_UET_EXPIRED" })
        else if (tokenName === "sut") return reply.status(401).send({ success: false, code: "ERR_SUT_EXPIRED" })
        // ▶ AT (Access Token)
        // AT derives from a cookie. The cookie and token have staggered TTLs to ensure
        // the cookie expires first (see `generateStaggeredExpiration`).
        // This makes the case appear 'slightly suspicious' (exploratory or tampering) while
        // the frontend cookie's misconfiguration cannot be ruled out completely.
        else if (tokenName === "at") {
          const code = `ERR_AT_COOKIE_PRESENT_BUT_V4_EXPIRED`
          const message = `Despite present in cookie, access token was expired. Unless the frontend cookie is misconfigured, this may indicate exploratory or tampering.`
          const suspiciousActor = {
            ip: reply.request.ip,
            userAgent: reply.request.headers["user-agent"],
            identity: userIdentifier,
          }
          throw new ErrorSuspiciousActivity(code, message, suspiciousActor)
        }

        // ▶ RT (Refresh Token)
        // The refresh token (RT) is:
        // - never exposed to the frontend
        // - stored in Redis
        // - keyed by a browser ID (BID)
        // making it difficult for an attacker to access.
        // A valid RT implies a legitimate BID, ruling out cookie tampering.
        // Since RT is only used within route handler logic, which is typically beyond an attacker’s reach,
        // an expired RT likely indicates a misconfiguration during token generation rather than malicious activity.
        // Which is why this case triggers an `ErrorDefensiveGuardBreach` instead of `ErrorSuspiciousActivity`.
        else if (tokenName === "rt") {
          const code = `ERR_RT_COOKIE_PRESENT_BUT_V4_EXPIRED`
          const message = `Despite browser ID was present in cookie and refresh token was available in Redis, refresh token was expired. Possibly bug during token generation`
          const context = {
            specialJson: JSON.stringify({ v4Token }),
            debug: { rt: v4Token },
          }
          throw new ErrorDefensiveGuardBreach(code, message, context)
        } else if (tokenName === "rptUserObj") {
          const code = `ERR_RPT_USER_OBJ_EXPIRED_EARLIER_THAN_RPT_OR_REDIS`
          const message = `This is the user object stored in Redis as V4 string. The Redis and its key which also derives from V4, are all set to expire in staggered timing (0, +10, +15 secs), so this case is normally impossible. Possibly bug during token generation`
          const context = {
            specialJson: JSON.stringify({ v4Token }),
            debug: { rt: v4Token },
          }
          throw new ErrorDefensiveGuardBreach(code, message, context)
        }
      }

      // ▶ Other Paseto Errors (Tampering / Malformed / Forged)
      case "ERR_PASETO_INVALID": //General validation failed
      case "ERR_PASETO_NOT_SUPPORTED": // Unsupported version or purpose
      case "ERR_PASETO_DECRYPTION_FAILED": // Couldn’t decrypt token
      case "ERR_PASETO_VERIFICATION_FAILED": {
        // Signature mismatch
        const code = `ERR_INVALID_PASETO`
        const message = `Paseto token was invalid. Possibly exploratory or tampering.`
        const suspiciousActor = {
          ip: reply.request.ip,
          userAgent: reply.request.headers["user-agent"],
          identity: userIdentifier,
        }
        throw new ErrorSuspiciousActivity(code, message, suspiciousActor)
      }

      // ▶ Fallback — unknown edge-case Paseto error
      // Invalid, forged, malformed token should be already caught by above cases.
      // This default case is here to make sure any edge case is caught.
      default: {
        const code = `ERR_UNKNOWN_PASETO_ERROR`
        const message = `Unexpected Paseto error. Possibly malformed or forged.`
        const suspiciousActor = {
          ip: reply.request.ip,
          userAgent: reply.request.headers["user-agent"],
          identity: userIdentifier,
        }
        throw new ErrorSuspiciousActivity(code, message, suspiciousActor)
      }
    }
  }
}
