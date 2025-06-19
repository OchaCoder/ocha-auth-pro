import { type FastifyReply } from "fastify"
import { isString } from "./_is-string.js"
import { TbV } from "../___typebox___/precompiled-validators.js"
import { ErrorSuspiciousActivity } from "../___error___/index.js"

/**
 * Validates the structural integrity of a browser ID (`bid`) used in secure session tracking.
 *
 * A valid browser ID:
 * - Must be a string
 * - Must not be empty
 * - Must be exactly 21 characters long
 * - Must contain only characters from the nanoid character set: [a-zA-Z0-9_-]
 *
 * This function protects against malformed or exploratory requests attempting to forge or
 * tamper with session identity via `bid`. Designed to be used early in access token refresh flows.
 *
 * ⚠️ Throws `ErrorSuspiciousActivity` on any violation to support logging, metrics, and alerting.
 *
 * @param browserId - The raw input value (usually from request body or cookie)
 * @param userIdentifier - A string representing the associated user or source (for logging context)
 * @returns The validated browser ID string
 */

export const valdBid = (reply: FastifyReply, browserId: unknown, userIdentifier: string): string => {
  if (!isString(browserId))
    throw new ErrorSuspiciousActivity(
      "ERR_BROWSER_ID_IS_NOT_A_STRING",
      "The browser ID provided was not a string. Possible tampering or malformed client payload.",
      { ip: reply.request.ip, userAgent: reply.request.headers["user-agent"], browserId: typeof browserId === "string" ? browserId : "", identity: userIdentifier },
      { debug: browserId }
    )

  if (browserId === "")
    throw new ErrorSuspiciousActivity(
      "ERR_BROWSER_ID_IS_AN_EMPTY_STRING",
      "The browser ID provided was an empty string. Possible tampering or malformed client payload.",
      { ip: reply.request.ip, userAgent: reply.request.headers["user-agent"], browserId: typeof browserId === "string" ? browserId : "", identity: userIdentifier },
      {
        specialJson: JSON.stringify({ browserId }),
        debug: { bid: browserId },
      }
    )
  if (browserId.length !== 21)
    throw new ErrorSuspiciousActivity(
      "ERR_INVALID_BROWSER_ID_LENGTH",
      "The browser ID didn't match the expected length of 21 characters. Possible tampering or malformed client payload.",
      { ip: reply.request.ip, userAgent: reply.request.headers["user-agent"], browserId: typeof browserId === "string" ? browserId : "", identity: userIdentifier },
      {
        specialJson: JSON.stringify({ browserId }),
        debug: { bid: browserId },
      }
    )

  if (!TbV.util.nanoId.Check(browserId)) {
    throw new ErrorSuspiciousActivity(
      "ERR_BROWSER_ID_HAS_INVALID_CHARACTER",
      "The Browser ID provided has invalid characters which doesn't align with nanoid's character format. Possible tampering or malformed client payload.",
      { ip: reply.request.ip, userAgent: reply.request.headers["user-agent"], browserId: typeof browserId === "string" ? browserId : "", identity: userIdentifier },
      { debug: browserId }
    )
  }

  return browserId
}
