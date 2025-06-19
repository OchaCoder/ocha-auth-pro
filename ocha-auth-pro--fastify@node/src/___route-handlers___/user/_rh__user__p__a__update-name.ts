import type { FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../../type.js"
import { rqirUserId } from "../../___fn___/index.js"
import { TBiUserPAUpdateName } from "../../___typebox___/index.js"
import { runPg } from "../../___postgres___/run/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { ErrorSuspiciousActivity } from "../../___error___/index.js"

export const rhUserPAUpdateName = (fastify: ProtectedFastify) => {
  return async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract id from request body
    const id = rqirUserId(request)

    // 2. Extract `name`
    const { name } = (request.body as TBiUserPAUpdateName).payload.data

    // 3. Update `name`
    const query = `UPDATE users SET name=$1 WHERE id = $2 RETURNING id, name;`
    const values = [name, id]
    const userIdentifier = `id::${id}`

    const validatedData = await runPg.query.obj(fastify, query, values, userIdentifier, TbV.user.p.a.updateName.pg)

    //4. Sanity check – Structurally valid, logically impossible
    if (validatedData === null)
      throw new ErrorSuspiciousActivity("ERR_USER_VANISHED_MID_OPERATION", `Expected user vanished in the midst of an update operation. Possibly exploratory, tampering, or replay attack`, {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        identity: `id::${id}`,
      })

    // 5. Send reply
    reply.code(200).send({
      success: true,
      data: { name: validatedData.name },
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["Protected action - User updated the `name`."],
      },
    })
  }
}
