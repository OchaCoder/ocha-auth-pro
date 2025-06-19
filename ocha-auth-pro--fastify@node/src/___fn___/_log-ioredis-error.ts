import type { FastifyInstance } from "fastify"
import chalk from "chalk"

export const logIoredisErrFailedHealthCheck = (fastify: FastifyInstance) => {
  return console.error(`
              ----------------------------------------------------
              ${chalk.red("💥 [ERROR]".padEnd(20))}${chalk.red(`Runtime Redis Failure`)}
              ${chalk.hex("#ff5733")("⏱️  [TIMESTAMP]".padEnd(20))} ${new Date().toISOString()}
              ${chalk.hex("#ff5733")("✉️  [MESSAGE]".padEnd(20))} ioredis became unavailable during runtime.
              ----------------------------------------------------
              ${chalk.yellow("ℹ️  [CAUSE]".padEnd(20))} Redis health check failed.
              ${chalk.yellow("ℹ️  [IMPACT]".padEnd(20))} ${chalk.red("REDIS IS CURRENTLY UNAVAILABLE.")} Some features may be degraded.
              ${chalk.yellow("ℹ️  [PROCESS PID]".padEnd(20))} ${process.pid}
              ${chalk.yellow("ℹ️  [REDIS HOST]".padEnd(20))} ${fastify.redis.options.host || "Unknown"}
              ${chalk.yellow("ℹ️  [REDIS PORT]".padEnd(20))} ${fastify.redis.options.port || "Unknown"}
              ----------------------------------------------------
`)
}

export const logIoredisErrUserRequestNotFulfilled = (fastify: FastifyInstance, userIdentifier: string | number, userWait: number) => {
  console.error(`
              ----------------------------------------------------
              ${chalk.red("💥 [ERROR]".padEnd(20))}${chalk.red(`ioredis (@fastify/redis)`)}
              ${chalk.hex("#ff5733")("⏱️  [TIMESTAMP]".padEnd(20))} ${new Date().toISOString()}
              ${chalk.hex("#ff5733")("✉️  [MESSAGE]".padEnd(20))} Max retry limit (${fastify.redis.options.maxRetriesPerRequest}) reached. The user's request could not be fulfilled.
              ----------------------------------------------------
              ${chalk.yellow("ℹ️  [CAUSE]".padEnd(20))} Redis was unavailable during the request.
              ${chalk.yellow("ℹ️  [IMPACT]".padEnd(20))} A user request has failed.
              ${chalk.yellow("ℹ️  [PROCESS PID]".padEnd(20))} ${process.pid}
              ${chalk.yellow("ℹ️  [REDIS HOST]".padEnd(20))} ${fastify.redis.options.host || "Unknown"}
              ${chalk.yellow("ℹ️  [REDIS PORT]".padEnd(20))} ${fastify.redis.options.port || "Unknown"}
              ----------------------------------------------------
              ${chalk.gray("ℹ️  [USER]".padEnd(20))} ${userIdentifier ?? "N/A"}
              ${chalk.gray("ℹ️  [RETRY COUNT]".padEnd(20))} ${fastify.redis.options.maxRetriesPerRequest ?? "N/A"}
              ${chalk.gray("ℹ️  [USER WAIT TIME]".padEnd(20))} ${userWait ? `${userWait}ms` : `N/A`}
              ${chalk.gray("ℹ️  [ACTION]".padEnd(20))} User redirected to '/oops'.
              ----------------------------------------------------
              ${chalk.gray("ℹ️  [REDIS OPTIONS]".padEnd(20))} maxRetriesPerRequest = ${fastify.redis.options.maxRetriesPerRequest ?? "N/A"}
              ----------------------------------------------------
`)
}

export const logIoredisErrFailedOnStartUp = (fastify: FastifyInstance) => {
  let timeoutMessage
  if (fastify.initialConfig.pluginTimeout === 10000) {
    timeoutMessage = `Set to default ${chalk.hex("#FFA500")("(10000ms)")}. Optionally, change it via global options ${chalk.hex("#FFA500")("{pluginTimeout:YOUR_MS}")}. `
  } else {
    timeoutMessage = `Set to ${chalk.hex("#FFA500")(`${fastify.initialConfig.pluginTimeout}ms`)} via global options ${chalk.hex("#FFA500")("{pluginTimeout:YOUR_MS}")}. `
  }
  console.error(`
              ----------------------------------------------------
              ${chalk.red("💥 [ERROR]".padEnd(24))}${chalk.red(`FastifyError`)}
              ${chalk.hex("#ff5733")("⏱️  [TIMESTAMP]".padEnd(24))} ${new Date().toISOString()}
              ${chalk.hex("#ff5733")("✉️  [MESSAGE]".padEnd(24))} ioredis (plugin: @fastify/redis) failed to connect before Fastify’s plugin timeout.
              ${chalk.gray("ℹ️  [TIMEOUT OPTIONS]".padEnd(24))} ${timeoutMessage}
              ----------------------------------------------------
              ${chalk.yellow("ℹ️  [CAUSE]".padEnd(24))} Reconnection strategy failed during Fastify startup.
              ${chalk.yellow("ℹ️  [IMPACT]".padEnd(24))} ${chalk.red("FASTIFY IS RUNNING WITHOUT REDIS.")} ioredis will continue retrying in the background.
              ${chalk.yellow("ℹ️  [PROCESS PID]".padEnd(24))} ${process.pid}
              ${chalk.yellow("ℹ️  [REDIS HOST]".padEnd(24))} ${fastify.redis.options.host || "Unknown"}
              ${chalk.yellow("ℹ️  [REDIS PORT]".padEnd(24))} ${fastify.redis.options.port || "Unknown"}
              ----------------------------------------------------
              ${chalk.gray("ℹ️  [CODE]".padEnd(24))} Fastify: FST_ERR_PLUGIN_TIMEOUT 
              ${chalk.gray("ℹ️  [CODE]".padEnd(24))} @fastify/redis: AVV_ERR_PLUGIN_EXEC_TIMEOUT  
              ----------------------------------------------------
`)
}

export const logIoredisErrUserRequestNotFulfilledUnknown = (fastify: FastifyInstance, err: Error, userIdentifier: string | number, userWait: number) => {
  return console.error(`
              ----------------------------------------------------
              ${chalk.red("💥 [ERROR]".padEnd(20))}${chalk.red(`Unknown Redis Error`)}
              ${chalk.hex("#ff5733")("⏱️  [TIMESTAMP]".padEnd(20))} ${new Date().toISOString()}
              ${chalk.hex("#ff5733")("✉️  [MESSAGE]".padEnd(20))} An unhandled Redis error occurred.
              ----------------------------------------------------
              ${chalk.yellow("ℹ️  [PROCESS PID]".padEnd(20))} ${process.pid}
              ${chalk.yellow("ℹ️  [REDIS HOST]".padEnd(20))} ${fastify.redis.options.host || "Unknown"}
              ${chalk.yellow("ℹ️  [REDIS PORT]".padEnd(20))} ${fastify.redis.options.port || "Unknown"}
              ----------------------------------------------------

              ${chalk.gray("ℹ️  [USER]".padEnd(20))} ${userIdentifier ?? "N/A"}
              ${chalk.gray("ℹ️  [USER WAIT TIME]".padEnd(20))} ${userWait ? `${userWait}ms` : `N/A`}
              ${chalk.gray("ℹ️  [ACTION]".padEnd(20))} User redirected to '/oops'.
              ----------------------------------------------------
              ${chalk.yellow("ℹ️  [ERROR MESSAGE]".padEnd(20))} ${err.message ?? "N/A"}
              ${chalk.yellow("ℹ️  [ERROR NAME]".padEnd(20))} ${err.name ?? "N/A"}
              ${chalk.yellow("ℹ️  [ERROR CODE]".padEnd(20))} ${(err as any).code ?? "N/A"}
              ${chalk.yellow("ℹ️  [STACK TRACE]".padEnd(20))} 
              ${chalk.gray(err.stack ?? "N/A")}
              ----------------------------------------------------
`)
}

// Unused logging templates
// export const logErrIoredisTIMEDOUT = (fastify: FastifyInstance, err: Error) => {
//   return console.error(`
//   ----------------------------------------------------
//   ${chalk.red("💥 [ERROR]".padEnd(20))}${chalk.red(`ioredis (@fastify/redis)`)}
//   ${chalk.hex("#ff5733")("⏱️  [TIMESTAMP]".padEnd(20))} ${new Date().toISOString()}
//   ${chalk.hex("#ff5733")("✉️  [MESSAGE]".padEnd(20))} Connection attempt timed out (ETIMEDOUT).
//   ----------------------------------------------------
//   ${chalk.yellow("ℹ️  [CAUSE]".padEnd(20))} TCP connection failed to establish within the timeout period.
//   ${chalk.yellow("ℹ️  [IMPACT]".padEnd(20))} Connection aborted. ioredis will attempt to retry.
//   ${chalk.yellow("ℹ️  [PROCESS PID]".padEnd(20))} ${process.pid}
//   ${chalk.yellow("ℹ️  [REDIS HOST]".padEnd(20))} ${fastify.redis.options.host || "Unknown"}
//   ${chalk.yellow("ℹ️  [REDIS PORT]".padEnd(20))} ${fastify.redis.options.port || "Unknown"}
//   ${chalk.yellow("ℹ️  [CODE & SYSCALL]".padEnd(20))} code:${(err as any).code ?? "N/A"}, syscall:${(err as any).syscall ?? "N/A"}
//   ----------------------------------------------------
//   ${chalk.gray("ℹ️  [REDIS OPTIONS]".padEnd(20))} connectTimeout = ${fastify.redis.options.connectTimeout ?? "N/A"}
//   ${chalk.gray("ℹ️  [REDIS OPTIONS]".padEnd(20))} retryStrategy = 1000
//   ----------------------------------------------------
//   `)
// }

// export const logErrIoredisSocketTimeout = (fastify: FastifyInstance) => {
//   return console.error(`
//     ----------------------------------------------------
//     ${chalk.red("💥 [ERROR]".padEnd(20))}${chalk.red(`ioredis (@fastify/redis)`)}
//     ${chalk.hex("#ff5733")("⏱️  [TIMESTAMP]".padEnd(20))} ${new Date().toISOString()}
//     ${chalk.hex("#ff5733")("✉️  [MESSAGE]".padEnd(20))} TCP socket timeout: No data received within ${fastify.redis.options.socketTimeout}.
//     ----------------------------------------------------
//     ${chalk.yellow("ℹ️  [CAUSE]".padEnd(20))} Connection assumed established, but socket expired.
//     ${chalk.yellow("ℹ️  [IMPACT]".padEnd(20))} Network marked as broken. ioredis entering reconnection loop.
//     ${chalk.yellow("ℹ️  [PROCESS PID]".padEnd(20))} ${process.pid}
//     ${chalk.yellow("ℹ️  [REDIS HOST]".padEnd(20))} ${fastify.redis.options.host || "Unknown"}
//     ${chalk.yellow("ℹ️  [REDIS PORT]".padEnd(20))} ${fastify.redis.options.port || "Unknown"}
//     ----------------------------------------------------
//     ${chalk.gray("ℹ️  [REDIS OPTIONS]".padEnd(20))} socketTimeout = ${fastify.redis.options.socketTimeout ?? "N/A"}
//     ----------------------------------------------------
//     `)
// }
