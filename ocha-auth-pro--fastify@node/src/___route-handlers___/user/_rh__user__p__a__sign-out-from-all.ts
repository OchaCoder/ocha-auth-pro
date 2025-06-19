import type { FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../../type.js"
import { rqirUserId } from "../../___fn___/index.js"
import { runRedis } from "../../___redis___/_run/index.js"

export const rhUserPASignOutFromAll = (fastify: ProtectedFastify) => {
  return async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract id from request body
    const id = rqirUserId(request)

    // 2. Delete user from Redis
    await runRedis.fireAndForget(
      fastify,
      async () => {
        const allBid = await fastify.redis.zrange(`user:${id}:browsers`, 0, -1)

        if (allBid.length > 0) {
          const keys = allBid.map((bid) => `browserID:${bid}`)

          fastify.redis.del(keys) // Remove all `rt` of this user from Redis, using corresponding `bid`.

          fastify.redis.del(`user:${id}:browsers`) // Remove the whole Redis Set storing all `bid` of this user, from Redis.
        }
      },
      id
    )

    // 3. Send reply
    reply.code(200).send({
      success: true,
      data: null,
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["Protected action - User is signing out from all browsers."],
      },
    })
  }
}
