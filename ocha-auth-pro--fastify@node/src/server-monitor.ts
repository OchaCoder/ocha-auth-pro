import Fastify from "fastify"

// Util
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { config } from "./config.js"

// Plugins
import fastifyPostgres from "@fastify/postgres"
import fastifyRedis from "@fastify/redis"
import { errorHandlerPlugin } from "./___plugins___/error-handler.js"
import { healthCheckPostgresMonitor } from "./___plugins___/health-check-postgres-monitor.js"
import { healthCheckRedisMonitor } from "./___plugins___/health-check-redis-monitor.js"
import { ioredisOptions } from "./___redis___/_plugin/ioredis-options.js"
import { ioredisAfterHandler } from "./___redis___/_plugin/ioredis-after-handler.js"
import { ioredisErrorDumper } from "./___redis___/_plugin/ioredis-error-dumper.js"

// Fn
import { hndlShutDown } from "./___fn___/index.js"

// Route Handlers
import { healthMonitor } from "./___route-handler-monitor___/health-monitor.js"
import { metricsMonitor } from "./___route-handler-monitor___/metrics-monitor.js"

// Create fastify instance
const monitor = Fastify({
  pluginTimeout: 6000, // default is 10000.
}).withTypeProvider<TypeBoxTypeProvider>()

// Register Plugins
monitor.register(errorHandlerPlugin)

// Health checkers
monitor.register(healthCheckRedisMonitor)
monitor.register(healthCheckPostgresMonitor)

// Register redis plugin
monitor.register(fastifyRedis, ioredisOptions()).after(ioredisAfterHandler(monitor))
monitor.after(() => monitor.redis.on("error", ioredisErrorDumper(monitor)))

// Register postgres plugin
monitor.register(fastifyPostgres, config.dbConfig)

monitor.get("/health", healthMonitor(monitor))
monitor.get("/metrics", metricsMonitor(monitor))

// Fatal synchronous errors anywhere in the app.
// Catches Global Errors (even outside Fastify).
process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception :: Preventing server crash:", err)
  process.exit(1)
})

// Async promise errors that weren’t caught.
// Catches Global Errors (even outside Fastify).
process.on("unhandledRejection", (reason) => {
  console.error("🔥 Unhandled Rejection :: Reason:", reason)
  process.exit(1)
})

// Start the server
const startServer = async () => {
  try {
    monitor.listen({ port: 9090, host: "0.0.0.0" })
    await monitor.ready()
    console.log(`🩺 Monitoring server is live on http://localhost:9090`)

    // // Start health check for Redis
    monitor.healthRedisMonitor()

    // Start health check for Postgres
    monitor.healthPostgresMonitor()

    // Friendly start up log💚🌻
    console.log("✨ ocha-auth-pro — Monitoring Server is up!")
    console.log("🩺 Check health at http://localhost:9090/health")
    console.log("📈 Metrics ready at http://localhost:9090/metrics")
    console.log("🌸 Thank you for caring about your infrastructure 🌸")

    // Listen for Ctrl+C or system termination
    process.on("SIGINT", () => hndlShutDown(monitor))
    process.on("SIGTERM", () => hndlShutDown(monitor))
  } catch (err) {
    console.error("💥Server failed to start:", err)
    process.exit(1)
  }
}

startServer()
