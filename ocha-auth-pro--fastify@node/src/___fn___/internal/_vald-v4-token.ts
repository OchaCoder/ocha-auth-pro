import { ErrorSuspiciousActivity } from "../../___error___/index.js"
import { isString } from "../_is-string.js"
import { type FastifyReply } from "fastify"
/**
 * Performs a lightweight structural check to ensure the given value appears to be
 * a Paseto v4 public token (`v4.public.`).
 *
 * This is your first line of defense against malformed, exploratory, or tampered requests.
 * It should be used before performing costly cryptographic verification via `V4.verify()`.
 *
 * Common use cases:
 * - Middleware or protected route guards
 * - Early rejection of invalid tokens
 * - Logging and alerting suspicious activity
 *
 * Throws `ErrorSuspiciousActivity` if the token does not match the expected format.
 *
 * @param v4Token - The raw Paseto token string
 * @param userIdentifier - A user identifier used for context in logging or alerting
 * @returns The same token, if valid
 */
export const valdV4Token = (reply: FastifyReply, v4Token: unknown, userIdentifier: string): string => {
  if (!isString(v4Token))
    throw new ErrorSuspiciousActivity(
      "ERR_V4_TOKEN_IS_NOT_A_STRING",
      "The Paseto v4 token provided was not a string. Possible tampering or malformed client payload.",
      {
        ip: reply.request.ip,
        userAgent: reply.request.headers["user-agent"],
        identity: userIdentifier,
      },
      { debug: v4Token }
    )

  if (v4Token === "")
    throw new ErrorSuspiciousActivity(
      "ERR_V4_TOKEN_IS_AN_EMPTY_STRING",
      "The Paseto v4 token provided was an empty string. Possible tampering or malformed client payload.",
      {
        ip: reply.request.ip,
        userAgent: reply.request.headers["user-agent"],
        identity: userIdentifier,
      },
      {
        specialJson: JSON.stringify({ v4Token }),
        debug: { bid: v4Token },
      }
    )

  if (!v4Token.startsWith("v4.public.")) {
    throw new ErrorSuspiciousActivity(
      "ERR_PASETO_V4_INVALID_PREFIX",
      "The token is expected to be a Paseto v4 public token, but it does not match the expected format. Likely exploratory or tampering.",
      {
        ip: reply.request.ip,
        userAgent: reply.request.headers["user-agent"],
        identity: userIdentifier,
      },
      {
        specialJson: JSON.stringify({ v4Token }),
        debug: { pasetoV4token: v4Token },
      }
    )
  }

  return v4Token
}
