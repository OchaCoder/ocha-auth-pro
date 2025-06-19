import fp from "fastify-plugin"

const interval = 1000 * 20

export const healthCheckRedisMonitor = fp(async (monitor) => {
  // Store the timeout ID to manage recurring health checks
  monitor.decorate("redisAvailable", false)
  monitor.decorate("healthIdRedis", null)

  monitor.addHook("onClose", (instance, done) => {
    if (monitor.healthIdRedis) clearTimeout(monitor.healthIdRedis)
    done()
  })

  /**
   * Monitoring server (PORT 9090) uses a fixed 20s ping interval.
   * Side-effect-based dynamic frequency mode is only used in the main server,
   * which serves user requests and can detect failures in real time.
   */
  const healthCheckLoop = () => {
    // Clear any existing scheduled health check before setting a new one
    if (monitor.healthIdRedis)
      clearTimeout(monitor.healthIdRedis)

      // Perform the Redis health check asynchronously and schedule the next check
    ;(async () => {
      try {
        // Measure Redis ping latency

        await monitor.redis.ping()
        console.log("🥁🥁🥁REDIS IS HEALTHY!!::", new Date())

        // Mark Redis as available
        monitor.redisAvailable = true

        // Schedule the next routine check
        monitor.healthIdRedis = setTimeout(() => healthCheckLoop(), interval)
      } catch (err) {
        monitor.redisAvailable = false
        console.error("❌ REDIS ERROR ::", new Date(), err)
        // Schedule an emergency health check
        monitor.healthIdRedis = setTimeout(() => healthCheckLoop(), interval)
      }
    })()
  }

  // Expose the health check function via Fastify's decorator system
  // Use is as healthRedis("STARTUP") or healthRedis("SPECIAL").
  monitor.decorate("healthRedisMonitor", healthCheckLoop)
})
