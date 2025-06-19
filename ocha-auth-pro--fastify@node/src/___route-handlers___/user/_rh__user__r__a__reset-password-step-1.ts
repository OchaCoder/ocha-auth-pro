import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import type { TBiUserRAResetPasswordStep1 } from "../../___typebox___/index.js"
import { nanoid } from "nanoid"
import { config } from "../../config.js"
import { Resend } from "resend"
import { V4 } from "paseto"
import { convWebSafeBtoA } from "../../___fn___/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { runPg } from "../../___postgres___/run/index.js"
import { runRedis } from "../../___redis___/_run/index.js"

export const rhUserRAResetPasswordStep1 = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extract email from request body
    const { email } = (request.body as TBiUserRAResetPasswordStep1).payload.data

    // 2. Use `email` to get `id` from Postgres.
    const query = `SELECT id FROM users WHERE email = $1 LIMIT 1;`
    const idOrNull = await runPg.query.obj(fastify, query, [email], email, TbV.user.r.a.resetPasswordStep1.pg)

    // 3. User is not in the system if null.
    if (idOrNull === null) return reply.status(400).send({ success: false, code: "ERR_PASS_RESET_REQUEST_W_UNREGISTERED_EMAIL" })

    // 4. Extract `id`
    const { id } = idOrNull

    // 5. Create `rpt` (reset password token)
    const rpt = nanoid()

    // 6. Create Paseto by including `{ rpt, id, email } as its `sub`.
    const rptV4 = await V4.sign({ sub: JSON.stringify({ rpt, id, email }) }, config.pasetoKeys.secret.rpt, { expiresIn: config.ttl.rpt }) // ttl is 180 seconds.

    // 7. Store `{ isUsed: false }` flag in Redis for `isUsed` check. TTL is 10 seconds longer than V4 to guarantee availability.
    runRedis.fireAndForget(fastify, async () => await fastify.redis.set(`reset:${rpt}`, JSON.stringify({ isUsed: false }), "EX", 180 + 10), `id::${id}-email::${email}`) // TTL is 10 seconds longer than V4.

    // 8. Generate the password reset url to be sent via `Resend`.
    const rptPrefix = `puf` // For adding a low cost format check in the frontend.
    const rptV4Ws = convWebSafeBtoA(rptV4) // Disguises V4 format cosmetically.
    const rptUrl = `${config.FRONTEND_URL}/account/reset-password-process/${rptPrefix}${rptV4Ws}`

    // 9. Send email via `Resend`
    const resend = new Resend(config.resend)
    try {
      await resend.emails.send({
        from: "OchaCoder 🍵 <no-reply@ochacoder.com>",
        to: email,
        subject: "Your password reset link is ready from OchaCoder🍵✨",
        html: `
        <p>Hello!🍵 As you have requested, here is your reset link:</p>
        <br>
        <div><a href="${rptUrl}">${rptUrl}</a></div>
        <br>
        <p>If this is not familiar, please reach out to our support at support@ochacoder.com</p>
        `,
        text: `Hello! Here's your reset link: ${rptUrl}`,
        headers: {
          "List-Unsubscribe": "<mailto:no-reply@ochacoder.com>",
        },
      })
    } catch (err) {
      throw new Error("ERR_RESEND_FAILED_TO_SEND_EMAIL")
    }

    // 10. Send reply
    reply.code(200).send({
      success: true,
      data: null,
      sideEffects: {
        cookie: { hasData: false, data: null },
        devNotes: ["General action - User is requesting password reset email."],
      },
    })
  }
}
