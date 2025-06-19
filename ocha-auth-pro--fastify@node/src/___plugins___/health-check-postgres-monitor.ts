import fp from "fastify-plugin"

const interval = 1000 * 20

export const healthCheckPostgresMonitor = fp(async (monitor) => {
  // Store the timeout ID to manage recurring health checks
  monitor.decorate("postgresAvailable", true)
  monitor.decorate("healthIdPostgres", null)

  monitor.addHook("onClose", (instance, done) => {
    if (monitor.healthIdPostgres) clearTimeout(monitor.healthIdPostgres)
    done()
  })

  /**
   * Monitoring server (PORT 9090) uses a fixed 20s ping interval.
   * Side-effect-based dynamic frequency mode is only used in the main server,
   * which serves user requests and can detect failures in real time.
   */
  const healthCheckLoop = () => {
    // Clear any existing scheduled health check before setting a new one
    if (monitor.healthIdPostgres)
      clearTimeout(monitor.healthIdPostgres)

      // Perform the Postgres health check asynchronously and schedule the next check
    ;(async () => {
      try {
        const client = await monitor.pg.connect()

        await monitor.pg.query("SELECT 1") // ⚠️ Keep neon awake!

        client.release()

        // Mark Postgres as available
        monitor.postgresAvailable = true
        console.log("🌱🌱🌱POSTGRES IS HEALTHY!!::", new Date())
        // Schedule the next routine check
        monitor.healthIdPostgres = setTimeout(() => healthCheckLoop(), interval)
      } catch (err) {
        console.error("❌ POSTGRES ERROR ::", new Date(), err)
        // If Postgres is down, log the failure and switch to emergency checks

        // Mark Postgres as unavailable
        monitor.postgresAvailable = false
        monitor.healthIdPostgres = setTimeout(() => healthCheckLoop(), interval)
      }
    })()
  }

  // Expose the health check function via fasitfy's decorator system
  // Use it as `healthPostgresMonitor()`.
  monitor.decorate("healthPostgresMonitor", healthCheckLoop)
})
