import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export const healthMonitor = (monitor: FastifyInstance) => {
  return async (_: FastifyRequest, reply: FastifyReply) => {
    const isPostgresStable = monitor.postgresAvailable ? "up" : "down"
    const isRedisStable = monitor.redisAvailable ? "up" : "down"
    const time = new Date().toISOString()
    const uptime = Math.round(process.uptime())

    return reply.code(200).send({
      success: true,
      data: {
        postgres: isPostgresStable,
        redis: isRedisStable,
        time,
        uptime,
      },
    })
  }
}
