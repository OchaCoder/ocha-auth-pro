import type { FastifyInstance } from "fastify"
import type { PoolClient } from "pg"
import type { TObject } from "@sinclair/typebox"
import { StaticDecode } from "@sinclair/typebox"
import { TypeCheck } from "@sinclair/typebox/compiler"
import { logPgErrUserRequestNotFulfilled } from "../../___fn___/index.js"
import { ErrorDefensiveGuardBreach, ErrorPostgres } from "../../___error___/index.js"

/**
 * `runPgQueryObjOrNull` is part of the `runPg` helper series,
 * which standardizes how Postgres queries are executed and how failures are handled.
 *
 * This helper executes a single Postgres query and:
 * - Expects **zero or one row** in return
 * - Validates that row against a provided TypeBox schema
 *
 * It is useful for:
 * - SELECT queries that return at most one result
 * - INSERT/UPDATE queries with a `RETURNING` clause
 *
 * If no row is found, it returns `null` — allowing the caller to handle absence explicitly.
 * If a row is found but fails schema validation, an error is thrown.
 *
 * Use this helper when:
 * - You expect at most one result row
 * - That row must match a strict schema
 * - You want automatic logging and Postgres health-checks on failure
 *
 * @returns The validated object, or `null` if no match was found
 */

export const runPgQueryObjOrNull = async <T extends TObject>(
  fastify: FastifyInstance,
  query: string,
  values: any[] | undefined,
  userIdentifier: string | number = "",
  validator: TypeCheck<T>
): Promise<StaticDecode<T, []> | null> => {
  const requestSentAt = Date.now()

  let client: PoolClient | undefined
  let rawData: { rows: unknown[] }

  try {
    client = await fastify.pg.connect()
    rawData = await client.query(query, values)
  } catch (err) {
    // Only catch errors thrown by PostgreSQL itself.
    // This usually indicates a connection issue or server failure.

    const requestTimeoutAt = Date.now()
    const userWait = requestTimeoutAt - requestSentAt

    logPgErrUserRequestNotFulfilled(fastify, userIdentifier, userWait)

    // Immediately start the special health check.
    if (fastify.postgresAvailable) fastify.healthPostgres("SPECIAL")

    throw new ErrorPostgres(err, "ERR_PG_DOWN") // Rename the error to ErrorPostgres and rethrow.
  } finally {
    if (client) client.release()
  }

  // Query was correct but no match was found (Postgres ran and returned 0 rows.)
  // Normal case in many SELECT / DELETE / UPDATE RETURNING.
  if (!rawData.rows[0]) return null

  // Defensive guard — this should never trigger if both the query and the TypeBox schema are correctly configured.
  // Helps catch mismatches if the schema or query changes in the future.
  if (!validator.Check(rawData.rows[0])) {
    const code = `ERR_BAD_PG_QUERY_OR_SCHEMA`
    const message = `rawData.rows[0] does not match the expected schema. Check the query string: ${query} and the TypeBox schema.`
    throw new ErrorDefensiveGuardBreach(code, message)
  }
  // Decode and return the validated row
  return validator.Decode(rawData.rows[0])
}
