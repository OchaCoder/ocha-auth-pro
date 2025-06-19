import { type FastifyReply } from "fastify"
import { config } from "../config.js"
import { valdDecryptedV4Obj, vrfyV4Token, valdV4Token, jsnpUetV4Sub } from "./internal/index.js"
import { convWebSafeAtoB } from "./index.js"

export const rslvSubFromUetV4Ws = async (reply: FastifyReply, uetObjV4Websafe: string, userIdentifier: string): Promise<{ uet: string; id: number; nextEmail: string }> => {
  // 1. 'webSafeBtoA' was used at the encoding stage. `webSafeAtoB(rpt)` is the pairing helper for decoding.
  const expectUetV4 = convWebSafeAtoB(uetObjV4Websafe)

  // 2. Validate paseto v4 token
  const validatedUetV4 = valdV4Token(reply, expectUetV4, userIdentifier)

  // 3. `v4.verify` wrapper that categorizes and rethrow errors.
  const decryptedV4Obj = await vrfyV4Token(reply, validatedUetV4, config.pasetoKeys.public.uet, userIdentifier, "uet")

  // 4. Throw or return `{sub: string; iat: string; exp: string;}`.
  const decryptedV4ObjWithSub = valdDecryptedV4Obj(decryptedV4Obj)

  // 5. Throw or return `{ uet: string; id: number; nextEmail: string }`.
  const validatedUet = jsnpUetV4Sub(decryptedV4ObjWithSub.sub)

  // 6. Return
  return validatedUet
}
