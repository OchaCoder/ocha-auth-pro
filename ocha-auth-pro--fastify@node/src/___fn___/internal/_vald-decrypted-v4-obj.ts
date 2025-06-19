import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"

/**
 * Validates the shape of a decrypted Paseto v4 object.
 *
 * The argument should be the result of a successful `V4.verify()` call.
 *
 * If this check fails, it means the token was cryptographically valid
 * but structurally unexpected — indicating a likely bug in the Paseto generation logic.
 */
export const valdDecryptedV4Obj = (decryptedV4Obj: unknown): { sub: string; iat: string; exp: string } => {
  // Defensive guard — Paseto verified successfully, but the resulting object shape was invalid.
  // This usually points to an internal bug in the token creation logic.

  if (!TbV.util.decryptedV4Obj.Check(decryptedV4Obj)) {
    // `ErrorDefensiveGuardBreach` class accepts context object with `specialJson` and `dubug` property.
    const specialContext = `v4Token::${JSON.stringify(decryptedV4Obj)}`

    throw new ErrorDefensiveGuardBreach(
      "ERR_MALFORMED_DECRYPTED_V4_OBJECT",
      "Token was successfully verified by Paseto v4, but the resulting structure was invalid. This may indicate a bug during token creation.",
      { specialJson: specialContext, debug: decryptedV4Obj }
    )
  }

  return decryptedV4Obj
}
