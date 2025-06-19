import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export const metricsMonitor = (monitor: FastifyInstance) => {
  return async (_: FastifyRequest, reply: FastifyReply) => {
    reply.type("text/plain")
    const lines = [
      "# HELP postgres_available Is Postgres up (1) or down (0)",
      "# TYPE postgres_available gauge",
      `postgres_available ${monitor.postgresAvailable ? 1 : 0}`,

      "# HELP redis_available Is Redis up (1) or down (0)",
      "# TYPE redis_available gauge",
      `redis_available ${monitor.redisAvailable ? 1 : 0}`,

      "# HELP node_uptime_seconds Process uptime in seconds",
      "# TYPE node_uptime_seconds gauge",
      `node_uptime_seconds ${Math.round(process.uptime())}`,
    ]

    return lines.join("\n")
  }
}
