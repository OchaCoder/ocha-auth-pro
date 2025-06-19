import { type FastifyReply } from "fastify"
import { config } from "../config.js"
import { valdDecryptedV4Obj, vrfyV4Token, valdV4Token, jsnpRptV4Sub } from "./internal/index.js"
import { convWebSafeAtoB } from "./index.js"

export const rslvSubFromRptV4Ws = async (reply: FastifyReply, rptObjV4Websafe: string, userIdentifier: string): Promise<{ rpt: string; id: number; email: string }> => {
  // 1. 'webSafeBtoA' was used at the encoding stage. `webSafeAtoB(rpt)` is the pairing helper for decoding.
  const expectRptV4 = convWebSafeAtoB(rptObjV4Websafe)

  // 2. Validate paseto v4 token.
  const validatedRptV4 = valdV4Token(reply, expectRptV4, userIdentifier)

  // 3. `v4.verify` wrapper that categorizes and rethrow errors.
  const decryptedV4Obj = await vrfyV4Token(reply, validatedRptV4, config.pasetoKeys.public.rpt, userIdentifier, "rpt")

  // 4. Throw or return `{sub: string; iat: string; exp: string;}`
  const decryptedV4ObjWithSub = valdDecryptedV4Obj(decryptedV4Obj)

  // 5. Throw or return `{ rpt: string; id: number; email: string }`
  const validatedRpt = jsnpRptV4Sub(decryptedV4ObjWithSub.sub)

  // 6. Return
  return validatedRpt
}
