import "fastify" // Ensure Fastify's types are loaded
import Redis from "ioredis"

export type HealthCheckType = "STARTUP" | "ROUTINE" | "SPECIAL" | "EMERGENCY"

declare module "fastify" {
  interface FastifyInstance {
    redisAvailable: boolean
    healthIdRedis: NodeJS.Timeout | null
    healthRedis: (checkType: HealthCheckType) => void
    healthRedisMonitor: () => void

    postgresAvailable: boolean
    healthIdPostgres: NodeJS.Timeout | null
    healthPostgres: (checkType: HealthCheckType) => void
    healthPostgresMonitor: () => void
  }
}
