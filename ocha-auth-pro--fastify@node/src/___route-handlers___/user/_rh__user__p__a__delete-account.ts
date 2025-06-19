import type { FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../../type.js"
import { rqirUserId } from "../../___fn___/index.js"
import { runPg } from "../../___postgres___/run/index.js"
import { runRedis } from "../../___redis___/_run/index.js"
import { ErrorSuspiciousActivity } from "../../___error___/index.js"

export const rhUserPADeleteAccount = (fastify: ProtectedFastify) => {
  return async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract `id` from request body
    const id = rqirUserId(request)

    // 2. Delete the user from the Database
    const isDeleted = await runPg.bool.modify(fastify, `DELETE FROM users WHERE id=$1`, [id], id)

    // 3. Throw suspicious case
    if (!isDeleted) {
      const code = `ERR_USER_VANISHED_MID_OPERATION`
      const message = `Expected user vanished in the midst of a delete operation. Possibly exploratory, tampering, or replay attack`
      const suspiciousActor = {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        identity: `${id}`,
      }
      throw new ErrorSuspiciousActivity(code, message, suspiciousActor)
    }

    // 4. Delete user from Redis
    await runRedis.fireAndForget(
      fastify,
      async () => {
        const allBid = await fastify.redis.zrange(`user:${id}:devices`, 0, -1)

        if (allBid.length > 0) {
          const keys = allBid.map((bid) => `deviceID:${bid}`)

          fastify.redis.del(keys)

          fastify.redis.del(`user:${id}:devices`)
        }
      },
      id
    )

    // 5: Send reply
    reply.code(200).send({
      success: true,
      data: null,
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["Protected action - User deleted their account."],
      },
    })
  }
}
