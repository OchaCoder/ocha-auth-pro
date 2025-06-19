import type { FastifyReply } from "fastify"
import { config } from "../config.js"
import { vrfyV4Token, valdDecryptedV4Obj, jsnpUserIdFromV4Sub, valdV4Token } from "./internal/index.js"

export const rslvUserIdFromAt = async (reply: FastifyReply, accessToken: unknown, userIdentifier: string): Promise<number> => {
  // 1. Make sure that the access token looks like a valid Paseto v4 public token.
  const validatedAcessToken = valdV4Token(reply, accessToken, userIdentifier)

  // 2. `v4.verify` + categorise erros and rethrow.
  const decryptedV4Obj = await vrfyV4Token(reply, validatedAcessToken, config.pasetoKeys.public.at, userIdentifier, "at")

  // 3. Make sure the decrypted object is in `{sub: string; iat: string; exp: string;}` shape.
  const validDecryptedV4Obj = valdDecryptedV4Obj(decryptedV4Obj)

  // 4. Make sure the `sub` is holding a number.
  const userId = jsnpUserIdFromV4Sub(validDecryptedV4Obj.sub)

  // 5. Return.
  return userId
}
