import type { FastifyInstance } from "fastify"
import chalk from "chalk"
import { logIoredisErrFailedOnStartUp } from "../../___fn___/index.js"

export const ioredisAfterHandler = (fastify: FastifyInstance) => {
  return function (err: Error | null) {
    if (err instanceof Error) {
      switch (true) {
        case err.message.includes("Plugin did not start in time: '@fastify/redis'."):
          fastify.redisAvailable = false
          logIoredisErrFailedOnStartUp(fastify)
          break
        default:
          console.error(`${new Date().toISOString()}:: ⛔️ [REDIS::DOWN] :: Connection failed on start-up. Plugin will keep trying to connect. `)
          fastify.redisAvailable = false
      }
    } else {
      fastify.redisAvailable = true
      console.log(chalk.green(`${new Date().toISOString()}:: ✅ [REDIS::UP] :: ioredis (Plugin @fastify/redis) was correctly mounted!`))
    }
  }
}
