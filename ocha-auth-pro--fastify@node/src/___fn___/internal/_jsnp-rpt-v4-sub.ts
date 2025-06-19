import { isObject } from "../_is-object.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"

/**
 * Parses and validates the `sub` field of a Paseto v4 token (used for password reset).
 *
 * This helper assumes the token has already passed `V4.verify()`,
 * ensuring it was signed with your server's private key.
 *
 * It performs a deep defensive check on the structure of `sub` — a JSON string — and returns its typed contents
 * only if they match the expected format:
 *
 *     { rpt: string; id: number; email: string }
 *
 * If the structure is malformed, this likely indicates a bug during token creation,
 * rather than external tampering — and is treated as a defensive guard breach.
 *
 * @returns { rpt: string; id: number; email: string }
 * @throws {ErrorDefensiveGuardBreach}
 */
export const jsnpRptV4Sub = (sub: string): { rpt: string; id: number; email: string } => {
  const parsedSub = JSON.parse(sub) as unknown
  const context = {
    file: `_jsnp-rpt-v4-sub.ts`,
    fn: `jsnpRptV4Sub`,
    specialJson: sub,
    debug: parsedSub,
  }
  if (parsedSub === null) {
    const code = `ERR_V4_SUB_IS_NULL`
    const message = `The 'sub' from the decrypted Paseto v4 is null. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  if (!isObject(parsedSub)) {
    const code = `ERR_V4_SUB_NOT_AN_OBJECT`
    const message = `The 'sub' from the decrypted Paseto v4 is not an object. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  if (!("rpt" in parsedSub) || !("id" in parsedSub) || !("email" in parsedSub)) {
    const code = `ERR_V4_SUB_MISSING_PROPERTY`
    const message = `The 'sub' should have 'rpt', 'id', and 'email'. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  if (typeof parsedSub.rpt !== "string" || typeof parsedSub.id !== "number" || !TbV.util.isEmail.Check(parsedSub.email)) {
    const code = `ERR_V4_SUB_INVALID_PROPERTY_VALUE`
    const message = `The 'sub' from the decrypted Paseto v4 object contains correct set of properties, but the value(s) found invalid. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  const validatedRptObj = { rpt: parsedSub.rpt, id: parsedSub.id, email: parsedSub.email }

  return validatedRptObj
}
