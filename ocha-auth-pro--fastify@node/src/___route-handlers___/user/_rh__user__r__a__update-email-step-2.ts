import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import type { TBiUserRAUpdateEmailStep2 } from "../../___typebox___/index.js"
import { rslvSubFromUetV4Ws } from "../../___fn___/index.js"
import { runPg } from "../../___postgres___/run/index.js"
import { ErrorDefensiveGuardBreach, ErrorSuspiciousActivity } from "../../___error___/index.js"
import { runRedis } from "../../___redis___/_run/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"

export const rhUserRAUpdateEmailStep2 = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extract values from `request.body`. Rename `uet` for convenience.
    const { uet: uetObjV4Websafe } = (request.body as TBiUserRAUpdateEmailStep2).payload.data

    // 2. Throws at multiple stages during extraction
    const { uet, id, nextEmail } = await rslvSubFromUetV4Ws(reply, uetObjV4Websafe, `expect::uetV4Websafe::${uetObjV4Websafe}`)

    // 3. Fetch the flag `{ isUsed: boolean }` to prepare for the upcoming `isUsed` check.
    const vldtRedis = await runRedis.get.obj(fastify, `update-email:${uet}`, `id::${id}`, TbV.user.r.a.updateEmailStep2.redis)

    // 4. This only happens when the network delays (query latencies) or clock skew was greater than 10 seconds.
    if (vldtRedis === null) {
      const code = "ERR_REDIS_EXPIRED"
      const message = "Dispite the 10 seconds buffer, Redis was not available for {isUsed} check on V4."
      const context = {
        file: "_rh__user__r__a__update-email-step-2.ts",
        fn: "rhUserRAUpdateEmailStep2",
      }
      throw new ErrorDefensiveGuardBreach(code, message, context)
    }

    // 5. Check if the token has been used before.
    if (vldtRedis.isUsed) return reply.status(403).send({ success: false, code: "ERR_UET_IS_USED" })

    // 6. Update Redis flag as `{ isUsed: true }`. Ensure UX by setting the TTL to 180 seconds.
    runRedis.fireAndForget(fastify, async () => await fastify.redis.set(`update-email:${uet}`, JSON.stringify({ isUsed: true }), "EX", 60 * 3), `id::${id}`) // Expires in 180 seconds.

    // 7. User is now verified. Store the new email in Postgres.
    const query = `UPDATE users SET email = $1 WHERE id = $2`
    const values = [nextEmail, id]
    const resultBool = await runPg.bool.modify(fastify, query, values, id)

    // 8. Unlikely due to the very short time window (180 seconds), but not impossible.
    if (!resultBool) {
      const code = `ERR_USER_VANISHED_MID_OPERATION`
      const message = `User requested an email update, deleted account, then proceeded on to email link click. Possibly exploratory, tampering, or replay attack.`
      const suspiciousActor = {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        identity: `id:${id}`,
      }
      throw new ErrorSuspiciousActivity(code, message, suspiciousActor)
    }

    // 9. Send reply
    reply.code(200).send({
      success: true,
      data: { email: nextEmail },
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["Protected action - User has updated the email."],
      },
    })
  }
}
