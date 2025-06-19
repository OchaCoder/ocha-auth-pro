import type { FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../../type.js"
import type { TBiUserRAUpdateEmailStep1 } from "../../___typebox___/index.js"
import { nanoid } from "nanoid"
import { V4 } from "paseto"
import { Resend } from "resend"
import { runPg } from "../../___postgres___/run/index.js"
import { runRedis } from "../../___redis___/_run/index.js"
import { convWebSafeBtoA } from "../../___fn___/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"
import { config } from "../../config.js"

export const rhUserRAUpdateEmailStep1 = (fastify: ProtectedFastify) => {
  return async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract values from `request.body`.
    const { prev, next } = (request.body as TBiUserRAUpdateEmailStep1).payload.data // guaranteed to exist

    // 2. Check if `next.email` exists in the db.
    const existsBool = await runPg.bool.exists(fastify, `SELECT 1 FROM users WHERE email=$1 LIMIT 1`, [next.email], prev.email)
    if (existsBool) return reply.status(400).send({ success: false, code: "ERR_EMAIL_ALREADY_EXISTS" })

    // 3. Use `prevEmail` to get `id` from Postgres.
    const idOrNull = await runPg.query.obj(fastify, `SELECT id FROM users WHERE email = $1 LIMIT 1;`, [prev.email], prev.email, TbV.user.r.a.updateEmailStep1.pg)

    // 4. Throw error if `null`, otherwise extract `id`.
    if (idOrNull === null) {
      const code = `ERR_EMAIL_SHOULD_EXIST_BUT_NOT_FOUND`
      const message = `The email used for the fetch also derives from a DB fetch, so this case is logically impossible. Likely a bug.`
      const context = {
        file: "_rh__user__r__a__update-email-step-1.ts",
        fn: "rhUserRAUpdateEmailStep1",
      }
      throw new ErrorDefensiveGuardBreach(code, message, context)
    }
    const { id } = idOrNull

    // 5. Create `uet` (Update email token)
    const uet = nanoid()

    // 6. Create Paseto by including `{ uet, id, nextEmail: next.email }` as its `sub`.
    const uetV4 = await V4.sign({ sub: JSON.stringify({ uet, id, nextEmail: next.email }) }, config.pasetoKeys.secret.uet, { expiresIn: "3 minutes" })

    // 7. Store `{ isUsed: false }` flag in Redis for `isUsed` check. TTL is 10 seconds longer than V4 to guarantee availability.
    runRedis.fireAndForget(fastify, async () => await fastify.redis.set(`update-email:${uet}`, JSON.stringify({ isUsed: false }), "EX", 60 * 3 + 10), `id:${id}, email:${prev.email}`)

    // 8. Generate url to be sent via `Resend`.
    const prefix = `UgMniuvvPDtt2pkPGq_0n` // For adding a low cost format check in the frontend.
    const uetV4Ws = convWebSafeBtoA(uetV4) // Disguises V4 format cosmetically.
    const url = `${config.FRONTEND_URL}/account/dashboard/update-email/${prefix}${uetV4Ws}`

    // 9. Send email via `Resend`.
    const resend = new Resend(config.resend)
    try {
      await resend.emails.send({
        from: "OchaCoder 🍵 <no-reply@ochacoder.com>",
        to: next.email,
        subject: "Please verify your email to continue - OchaCoder🍵✨",
        html: `
        <p>We received a request to change your email to ${next.email}.</p>
        <p>To protect your account, we need to verify your new email address before updating it.</p>
        <br>
        <div><a href="${url}">${url}</a></div>
        <br>
        <p>If this wasn’t you, feel free to ignore this message or contact our support team.</p>
        <br>
        <p>-</p>
        <p>Warm regards,</p>
        <p>OchaCoder<p/>
        `,
        text: `Please verify your email to continue - ${url}`,
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
        devNotes: ["Protected action - User is requesting an email update."],
      },
    })
  }
}
