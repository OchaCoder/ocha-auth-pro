import { isObject } from "../_is-object.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"

/**
 * Parses and validates the `sub` field of a Paseto v4 token.
 *
 * This helper assumes the token has already passed `V4.verify()`.
 *
 * It performs a deep defensive check on the structure of `sub` — a JSON string — and returns its typed contents
 * only if they match the expected format:
 *
 *     { sut: string; name: string; email: string; password:string; }
 *
 * If the structure is malformed, this likely indicates a bug during token creation,
 * rather than external tampering — and is treated as a defensive guard breach.
 *
 * @returns { sut: string; name: string; email: string; password: string }
 * @throws {ErrorDefensiveGuardBreach}
 */
export const jsnpSutV4Sub = (sub: string): { sut: string; name: string; email: string; password: string } => {
  const parsedSub = JSON.parse(sub) as unknown
  const context = {
    file: `_jsnp-sut-v4-sub.ts`,
    fn: `jsnpSutV4Sub`,
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

  if (!("sut" in parsedSub) || !("name" in parsedSub) || !("email" in parsedSub) || !("password" in parsedSub)) {
    const code = `ERR_V4_SUB_MISSING_PROPERTY`
    const message = `The 'sub' shoud have 'sut', 'name', 'email', and 'password'. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  if (typeof parsedSub.sut !== "string" || typeof parsedSub.name !== "string" || !TbV.util.isEmail.Check(parsedSub.email) || typeof parsedSub.password !== "string") {
    const code = `ERR_V4_SUB_INVALID_PROPERTY_VALUE`
    const message = `The 'sub' from the decrypted Paseto v4 object contains correct set of properties, but the value(s) found invalid. Likely a bug during token generation.`
    throw new ErrorDefensiveGuardBreach(code, message, context)
  }

  const validatedRptObj = { sut: parsedSub.sut, name: parsedSub.name, email: parsedSub.email, password: parsedSub.password }

  return validatedRptObj
}
