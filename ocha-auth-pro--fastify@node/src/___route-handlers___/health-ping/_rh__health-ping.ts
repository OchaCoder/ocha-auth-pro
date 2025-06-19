import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

/**
 *
 * WebSocket clients should ping this route to check the availability of Fastify server
 * before attempting reconnect after server down has been detected by `onclose` event.
 *
 * Only attempt reconnect to the `/ws` route after successful reply has been confirmed client-side.
 *
 * To avoid mass hammering the `/ws` route on the server recovery, implement both exponential backoff and
 * random jitter delay on the retry strategy.
 *
 */
export const rhHealthPing = (fastify: FastifyInstance) => {
  return async (_: FastifyRequest, reply: FastifyReply) => {
    const postgres = fastify.postgresAvailable
    const redis = fastify.redisAvailable

    reply.status(200).send({ success: true, data: { stable: postgres && redis, time: new Date().toISOString() } })
  }
}
