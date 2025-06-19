import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import type { TBiUserRAResetPasswordStep2 } from "../../___typebox___/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { rslvObfuscatedEmail, rslvSubFromRptV4Ws } from "../../___fn___/index.js"
import { runRedis } from "../../___redis___/_run/index.js"
import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"

/**
 * Handles the second step of the password reset flow by validating a Paseto V4 token and checking its usage in Redis.
 * @param fastify - Fastify instance with Redis plugin.
 * @returns A route handler that processes the reset password request.
 */
export const rhUserRAResetPasswordStep2 = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extract values from `request.body`. Rename `rpt` for convenience.
    const { rpt: rptV4Ws } = (request.body as TBiUserRAResetPasswordStep2).payload.data

    // 2. Decrypt, validate, extract. Throws error at multiple stages.
    const { rpt, id, email } = await rslvSubFromRptV4Ws(reply, rptV4Ws, `ip:${request.ip}`)

    // 3. Fetch the flag `{ isUsed: boolean }` to prepare for the `isUsed` check.
    const isUsedOrNull = await runRedis.get.obj(fastify, `reset:${rpt}`, `id::${id}`, TbV.user.r.a.resetPasswordStep2.redis)

    // 4. This only happens when the network delays (query latencies) or clock skew was greater than 10 seconds.
    if (isUsedOrNull === null) {
      const code = "ERR_REDIS_EXPIRED"
      const message = "Dispite the 10 seconds buffer, Redis was not available for {isUsed} check on V4."
      const context = {
        file: "_rh__user__r__a__update-email-step-2.ts",
        fn: "rhUserRAUpdateEmailStep2",
      }
      throw new ErrorDefensiveGuardBreach(code, message, context)
    }

    // 5. Check if the token has been used before.
    const { isUsed } = isUsedOrNull
    if (isUsed) return reply.status(403).send({ success: false, code: "ERR_RPT_IS_USED" })

    // 6. Update Redis flag as `{ isUsed: true }`. Ensure UX by setting the TTL to 180 seconds.
    runRedis.fireAndForget(fastify, async () => await fastify.redis.set(`reset:${rpt}`, JSON.stringify({ isUsed: true }), "EX", 60 * 3), `id::${id}`) // Expires in 180 seconds.

    // 7. Obfuscate `email`.
    const obfuscatedEmail = rslvObfuscatedEmail(email)

    // 8. Send reply
    reply.code(200).send({
      success: true,
      data: { rpt: rptV4Ws, obfuscatedEmail },
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["General action - The returned reset password token via email link is verified."],
      },
    })
  }
}
