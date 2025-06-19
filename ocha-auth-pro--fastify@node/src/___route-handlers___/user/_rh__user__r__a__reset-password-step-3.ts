import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import type { TBiUserRAResetPasswordStep3 } from "../../___typebox___/index.js"
import argon2 from "argon2"
import { config } from "../../config.js"
import { rslvSubFromRptV4Ws } from "../../___fn___/index.js"
import { runPg } from "../../___postgres___/run/index.js"
import { ErrorSuspiciousActivity } from "../../___error___/index.js"

export const rhUserRAResetPasswordStep3 = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extract values from `request.body`. Rename `rpt` for convenience.
    const { password, rpt: rptObjV4Websafe } = (request.body as TBiUserRAResetPasswordStep3).payload.data

    // 2. Throws at multiple stages during extraction
    const { id } = await rslvSubFromRptV4Ws(reply, rptObjV4Websafe, `expect::rptV4Websafe::${rptObjV4Websafe}`)

    // 3. The user is legit. Hash user password.
    const newHashedPassword = await argon2.hash(password, config.argon2Config)

    // 4. Store the new hashed-password in Postgres.
    const query = `UPDATE users SET hashed_password = $1 WHERE id = $2`
    const values = [newHashedPassword, id]
    const resultBool = await runPg.bool.modify(fastify, query, values, id)

    // 5. Unlikely due to the very short time window (180 seconds), but not impossible.
    if (!resultBool) {
      const code = `ERR_USER_VANISHED_MID_OPERATION`
      const message = `User requested a password reset email, then vanished, then continued to update password. Possibly exploratory, tampering, or replay attack.`
      const suspiciousActor = {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        identity: `id:${id}`,
      }
      throw new ErrorSuspiciousActivity(code, message, suspiciousActor)
    }

    // 6. Send reply
    reply.code(200).send({
      success: true,
      data: null,
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["General action - User has updated the password via reset password token sent by email."],
      },
    })
  }
}
