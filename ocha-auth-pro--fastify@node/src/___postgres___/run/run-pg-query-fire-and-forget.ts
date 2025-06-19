import type { FastifyInstance } from "fastify"
import type { PoolClient } from "pg"
import { logPgErrUserRequestNotFulfilled } from "../../___fn___/index.js"
import { ErrorPostgres } from "../../___error___/index.js"

/**
 * `runPgQueryFireAndForget` is part of the `runPg` helper series,
 * which standardizes how Postgres commands are executed and how failures are handled.
 *
 * This helper runs a single SQL query where no return value is needed.
 * It is ideal for commands executed for their side effect, such as:
 * - INSERT
 * - UPDATE
 * - DELETE
 * - ALTER TABLE
 * - TRUNCATE
 *
 * Use `runPgModify()` instead if you need to check `rowCount` to confirm success.
 *
 * This helper intentionally discards the query result.
 *
 * @returns void
 */

export const runPgQueryFireAndForget = async (fastify: FastifyInstance, query: string, values: any[] | undefined, userIdentifier: string | number = ""): Promise<void> => {
  const requestSentAt = Date.now()

  let client: PoolClient | undefined

  try {
    client = await fastify.pg.connect()

    await client.query(query, values) // The result is discarded intentionally.
  } catch (err) {
    // Only catch errors thrown by PostgreSQL itself.
    // This usually indicates a connection issue or server failure.

    const requestTimeoutAt = Date.now()
    const userWait = requestTimeoutAt - requestSentAt

    logPgErrUserRequestNotFulfilled(fastify, userIdentifier, userWait)

    // Immediately start the special health check.
    if (fastify.postgresAvailable) fastify.healthPostgres("SPECIAL")

    throw new ErrorPostgres(err, "ERR_PG_DOWN")
  } finally {
    if (client) client.release()
  }
}
