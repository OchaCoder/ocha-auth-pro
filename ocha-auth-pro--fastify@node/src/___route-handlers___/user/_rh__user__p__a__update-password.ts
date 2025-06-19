import type { FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../../type.js"
import argon2 from "argon2"
import { TBiUserPAUpdatePassword } from "../../___typebox___/index.js"
import { runPg } from "../../___postgres___/run/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { config } from "../../config.js"
import { rqirUserId } from "../../___fn___/_rqir-user-id.js"
import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"

export const rhUserPAUpdatePassword = (fastify: ProtectedFastify) => {
  return async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract values from `request.body`
    const id = rqirUserId(request)
    const { prev, next } = (request.body as TBiUserPAUpdatePassword).payload.data

    // 2. Use `id` to get `hashed_password`
    const query1 = `SELECT hashed_password FROM users WHERE id=$1 LIMIT 1`
    const hPasswordOrNull = await runPg.query.obj(fastify, query1, [id], id, TbV.user.p.a.updatePassword.pg)

    // 3. Throw if null, else extract `hashed_password` and rename it for convenience
    if (hPasswordOrNull === null) {
      const code = `ERR_USER_VANISHED`
      const message = `User ID (${id}) not found in users table during password update`
      const context = { file: `_rh__user__p__a__update-password.ts`, fn: `rhUserPAUpdatePassword` }
      throw new ErrorDefensiveGuardBreach(code, message, context)
    }

    const { hashed_password: hPassword } = hPasswordOrNull

    console.log("wrong prev.password on purpose---1")
    // 4. Varify the `prev.password`
    const isPasswordMatching = await argon2.verify(hPassword, prev.password)
    if (!isPasswordMatching) return reply.status(403).send({ success: false, code: "ERR_PREV_PASSWORD_NOT_MATCHING" })
    console.log("wrong prev.password on purpose---2")
    // 5. Hash `next.password`
    const hNextPassword = await argon2.hash(next.password, config.argon2Config)

    // 6. Update `hashed_password`
    const query2 = `UPDATE users SET hashed_password=$1 WHERE id = $2;`
    const values = [hNextPassword, id]
    const userIdentifier = `id::${id}`
    await runPg.query.fireAndForget(fastify, query2, values, userIdentifier)

    // 7. Send reply
    reply.code(200).send({
      success: true,
      data: null,
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["Protected action - User updated password."],
      },
    })
  }
}
