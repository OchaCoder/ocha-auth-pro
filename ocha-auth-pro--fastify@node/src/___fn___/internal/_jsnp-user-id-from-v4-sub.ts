import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"
import { isNumber } from "../_is-number.js"
import { isObject } from "../_is-object.js"

/**
 * ⚠️ Use this parser on a Paseto-verified `sub` string to perform a final defensive check.
 *
 * The token should have already passed Paseto v4 verification,
 * which guarantees it was signed with our secret key.
 * If the structure is malformed at this point, it’s most likely a bug
 * during token generation — not an external attack.
 */
export const jsnpUserIdFromV4Sub = (sub: string): number => {
  const parsedSub = JSON.parse(sub) as unknown
  const context = {
    file: `_jsnp-user-id-from-v4-sub.ts`,
    fn: `jsnpUserIdFromV4Sub`,
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

  if (!("id" in parsedSub)) {
    const code = `ERR_V4_SUB_MISSING_ID_PROPERTY`
    const message = `The 'sub' should have 'id'. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  if (!isNumber(parsedSub.id)) {
    const code = `ERR_V4_SUB_INVALID_PROPERTY`
    const message = `The 'sub' from the decrypted Paseto v4 object contains 'id', but the value is not a number. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  return parsedSub.id
}
