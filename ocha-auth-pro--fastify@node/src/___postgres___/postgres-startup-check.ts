import type { FastifyInstance } from "fastify"
import type { PoolClient } from "pg"
import chalk from "chalk"
import { logPgErrFailedOnStartUp, logPgErrWrongCredential } from "../___fn___/index.js"

export async function postgresStartupCheck(fastify: FastifyInstance) {
  const maxRetries = 6
  const delayMs = 1000

  for (let i = 0; i < maxRetries; i++) {
    const timeBefore = Date.now()
    try {
      const client: PoolClient = await fastify.pg.connect()

      client.release() // Release the client immediately after the connection check!

      const timeAfter = Date.now()
      const latency = timeAfter - timeBefore
      const stableMessage = `:: ✅ [POSTGRES::HEALTH::STARTUP_CHECK] :: Passed with latency of `
      console.log(chalk.green(`${new Date().toISOString()}${stableMessage}${chalk.bold(`${latency}`)}`))

      // Flag Postgres as up.
      fastify.postgresAvailable = true

      // Enter routine health check loop with the relaxed interval.
      fastify.healthPostgres("ROUTINE")

      // Break out from the start up check.
      break
    } catch (err) {
      // The connection is reaching Postgres, but Postgres is rejecting the connection.
      // This is the case where credentials are likely wrong.
      if ((err as Error).message.includes("password authentication failed")) {
        logPgErrWrongCredential(fastify)
        throw err // We stop Fastify from starting the server, until the problem is resolved.
      }
      // This is the case where Postgres is down.
      else {
        let retryMessage = `🔄 [POSTGRES::CONNECTION_RETRY] :: Connection attempt # ${i + 1} failed - will retry in ${delayMs}ms...`
        fastify.postgresAvailable = false
        console.log(`${new Date().toISOString()} + ${retryMessage}`)

        // Loop into another retry
        if (i < maxRetries - 1) await new Promise((res) => setTimeout(res, delayMs))
        // node-postgres couldn't establish connection to Postgres within maxRetries.
        else {
          // We will start Fastify while entering healthcheck loop with the shortest interval.
          logPgErrFailedOnStartUp(fastify, maxRetries)
          fastify.healthPostgres("STARTUP")
        }
      }
    }
  }
}
