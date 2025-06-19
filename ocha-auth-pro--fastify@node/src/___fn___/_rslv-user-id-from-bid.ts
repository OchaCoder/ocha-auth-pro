import type { FastifyInstance, FastifyReply } from "fastify"
import { config } from "../config.js"
import { rqirRt, valdV4Token, vrfyV4Token, jsnpUserIdFromV4Sub, valdDecryptedV4Obj } from "./internal/index.js"
import { valdBid } from "./_vald-bid.js"

/**
 * Use this resolver to authenticate user using browser ID `bid`.
 * @param fastify
 * @param reply
 * @param browserId
 * @returns userId which is a type of number.
 */
export const rslvUserIdFromBid = async (fastify: FastifyInstance, reply: FastifyReply, browserId: unknown): Promise<number> => {
  // 1. Validate the format of browser ID.
  const validatedBrowserId = valdBid(reply, browserId, `bid::${browserId}`)

  // 2. Retrieve the refresh token from Redis using browser ID. ⚠️User authentication - Stage 1⚠️
  const rawRt = await rqirRt(fastify, reply, validatedBrowserId, `bid::${validatedBrowserId}`)

  // 3. Validate the format of paseto v4 token.
  const validatedRt = valdV4Token(reply, rawRt, `bid::${validatedBrowserId}_rt::${rawRt}`)

  // 4. `v4.verify` + categorise erros and rethrow. ⚠️User authentication - Stage 2⚠️
  const decryptedV4Obj = await vrfyV4Token(reply, validatedRt, config.pasetoKeys.public.rt, `bid::${validatedBrowserId}_rt::${validatedRt}`, "rt")

  // 5.  Make sure the decrypted object is in `{sub: string; iat: string; exp: string;}` shape.
  const validDecryptedV4Obj = valdDecryptedV4Obj(decryptedV4Obj)

  // 6. Make sure the `sub` is holding a number.
  const userId = jsnpUserIdFromV4Sub(validDecryptedV4Obj.sub)

  // 7. Return.
  return userId
}
