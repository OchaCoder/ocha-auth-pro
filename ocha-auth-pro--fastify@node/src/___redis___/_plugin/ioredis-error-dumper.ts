import type { FastifyInstance } from "fastify"

// Preserve clean log state by dumping unnecessary error logs.
export const ioredisErrorDumper = (fastify: FastifyInstance) => {
  return function (err: unknown) {
    if (err instanceof Error) {
      switch (true) {
        case err.message.includes("ECONNRESET"):
        case err.message.includes("maxRetriesPerRequest"):
        case err.message.includes("ETIMEDOUT"): // TCP connection failed to establish within the `connectTimeout` after `retryStrategy`.
        case err.message.includes("Socket timeout"): // `socketTimeout` passed during command execution on application level. Entering retryStrategy.
        case err.message.includes("Command timed out"): // Only thrown when `commandTimeout` is set to true.
          break
      }
    }
  }
}
