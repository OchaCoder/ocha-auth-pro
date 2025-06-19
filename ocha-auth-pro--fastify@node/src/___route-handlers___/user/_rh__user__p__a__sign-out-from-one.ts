import type { FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../../type.js"
import type { TBiUserPASignOutFromOne } from "../../___typebox___/index.js"
import { runRedis } from "../../___redis___/_run/index.js"
import { rqirUserId, valdBid } from "../../___fn___/index.js"

export const rhUserPASignOutFromOne = (fastify: ProtectedFastify) => {
  return async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract id from request body
    const id = rqirUserId(request)

    // 2. Extract bid from request body. Required to find and delete only the specific refresh token.
    const { bid } = (request.body as TBiUserPASignOutFromOne).payload.data

    // 3. Validate the shape of `bid`
    const validatedBid = valdBid(reply, bid, `id::${id}`)

    // 4. Delete user from Redis
    await runRedis.fireAndForget(
      fastify,
      async () => {
        fastify.redis.getdel(`browserID:${validatedBid}`) // Remove one `rt` from Redis, using corresponding `bid`.

        fastify.redis.zrem(`user:${id}:browsers`, validatedBid) // Remove one `bid` from Redis Set storing all `bid` of this user.
      },
      id
    )

    // 5. Send reply
    reply.code(200).send({
      success: true,
      data: null,
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["Protected action - User is signing out from the current browser."],
      },
    })
  }
}
