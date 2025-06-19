import { type FastifyReply } from "fastify"
import { config } from "../config.js"
import { valdDecryptedV4Obj, vrfyV4Token, valdV4Token, jsnpSutV4Sub } from "./internal/index.js"
import { convWebSafeAtoB } from "./index.js"

export const rslvSubFromSutV4Ws = async (reply: FastifyReply, sutV4Ws: string, userIdentifier: string): Promise<{ sut: string; name: string; email: string; password: string }> => {
  // 1. 'webSafeBtoA' was used at the encoding stage. `webSafeAtoB(rpt)` is the pairing helper for decoding.
  const expectSutV4 = convWebSafeAtoB(sutV4Ws)

  // 2. Validate paseto v4 token.
  const validatedSutV4 = valdV4Token(reply, expectSutV4, userIdentifier)

  // 3. `v4.verify` wrapper that categorizes and rethrow errors.
  const decryptedV4Obj = await vrfyV4Token(reply, validatedSutV4, config.pasetoKeys.public.sut, userIdentifier, "sut")

  // 4. Throw or else return  `{sub: string; iat: string; exp: string;}`.
  const decryptedV4ObjWithSub = valdDecryptedV4Obj(decryptedV4Obj)

  // 5. Throw or else return `{ sut: string; name: string; email: string; password: string }`.
  const validatedSut = jsnpSutV4Sub(decryptedV4ObjWithSub.sub)

  return validatedSut
}
