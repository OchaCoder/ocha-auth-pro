import fp from "fastify-plugin"
import { ErrorDefensiveGuardBreach, ErrorPostgres, ErrorRedis, ErrorSuspiciousActivity } from "../___error___/index.js"

/**
 * Catches Errors inside Fastify routes, hooks, and middleware.
 * Only works on errors from within Fastify’s request-response cycle.
 */
export const errorHandlerPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((err, request, reply) => {
    // Create timestamp for logging
    const timeStamp = new Date().toISOString()

    if (err instanceof Error && err.message.includes("must be equal to constant")) {
      console.error(timeStamp, "The input sent from the frontend is not matching the route schema.", err)
      return reply.status(400).send({ success: false, code: "ERR_UNKNOWN" })
    }

    // System Errors (Backends down)
    if (err instanceof ErrorPostgres || err instanceof ErrorRedis) {
      return reply.status(500).send({ success: false, code: "ERR_SYSTEM_FAILURE" })
    }

    // Suspicious user activity.
    else if (err instanceof ErrorSuspiciousActivity) {
      return reply.status(400).send({ success: false, code: "ERR_SUSPICIOUS_ACTIVITTY" })
    }

    // Defensive guard breach
    else if (err instanceof ErrorDefensiveGuardBreach) {
      return reply.status(500).send({ success: false, code: "ERR_DEFENSIVE_GUARD_BREACH" })
    }

    switch (err.message) {
      case "ERR_PG_INSERT_FAILED":
        return reply.status(500).send({ success: false, code: "ERR_SYSTEM_FAILURE" })

      // Resend.com failed to send email.
      case "ERR_RESEND_FAILED_TO_SEND_EMAIL":
        console.error(timeStamp, "Resend failed to send a password reset email.")
        return reply.status(500).send({ success: false, code: "ERR_EMAIL_SEND_FAILED" })

      // Truly unknown case
      default:
        console.error(timeStamp, "Truly unknown case.", err)
        return reply.status(400).send({ success: false, code: "ERR_UNKNOWN" })
    }
  })
})
