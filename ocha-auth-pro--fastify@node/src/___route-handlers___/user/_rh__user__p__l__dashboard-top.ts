import type { FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../../type.js"
import { rqirUserId } from "../../___fn___/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { runPg } from "../../___postgres___/run/index.js"
import { ErrorSuspiciousActivity } from "../../___error___/index.js"

export const rhUserPLDashTop = (fastify: ProtectedFastify) => {
  return async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract id from request body
    const id = rqirUserId(request)

    // 2. Get user based on id.
    const query = `SELECT name, email, created_at, last_modified_at FROM users WHERE id = $1 LIMIT 1;`
    const validatedData = await runPg.query.obj(fastify, query, [id], id, TbV.user.p.l.dashTop.pg)

    // 3. Sanity check – Structurally valid, logically impossible
    if (validatedData === null)
      throw new ErrorSuspiciousActivity("ERR_USER_VANISHED_DURING_LOAD", `Expected user vanished during page load. Possibly stale session, tampering or replay attack.`, {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        identity: `${id}`,
      })

    // 4. Send reply
    reply.code(200).send({
      success: true,
      data: {
        name: validatedData.name,
        email: validatedData.email,
        createdAt: validatedData.created_at,
        lastModifiedAt: validatedData.last_modified_at,
      },
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["Loading protected static data - Dashboard page"],
      },
    })
  }
}
