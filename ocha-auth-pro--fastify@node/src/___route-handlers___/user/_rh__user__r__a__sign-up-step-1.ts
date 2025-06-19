import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import type { TBiUserRASignUpStep1 } from "../../___typebox___/index.js"
import { nanoid } from "nanoid"
import { V4 } from "paseto"
import { config } from "../../config.js"
import { convWebSafeBtoA } from "../../___fn___/index.js"
import { runPg } from "../../___postgres___/run/index.js"
import { runRedis } from "../../___redis___/_run/index.js"
import { Resend } from "resend"

export const rhUserRASignUpStep1 = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extract values from `request.body`
    const { name, email, password } = (request.body as TBiUserRASignUpStep1).payload.data
    console.log("rhUserRASignUpStep1 is running: Payload-> name, email, password :", name, email, password)
    // 2. Check if `email` already exists in the database
    const isEmail = await runPg.bool.exists(fastify, `SELECT 1 FROM users WHERE email=$1 LIMIT 1`, [email], email)
    if (isEmail) return reply.status(400).send({ success: false, code: "ERR_EMAIL_ALREADY_EXISTS" })
    console.log("isEmail", isEmail)
    // 3. Create `sut` (Sign-up token)
    const sut = nanoid()

    // 4. Create V4 and include `{ sut, name, email, password }` as its `sub`
    const sutV4 = await V4.sign({ sub: JSON.stringify({ sut, name, email, password }) }, config.pasetoKeys.secret.sut, { expiresIn: `180 seconds` })

    // 5. Store `{ isUsed: false }` flag in Redis for `isUsed` check later. TTL is 10 seconds longer than V4 to guarantee availability.
    runRedis.fireAndForget(fastify, async () => await fastify.redis.set(`sign-up:${sut}`, JSON.stringify({ isUsed: false }), "EX", 180 + 10), `ip:${request.ip}, email:${email}`)

    // 6. Generate email link.
    const prefix = `IfUW_ZkG6_eEHb9UD-aRn` // For adding a low cost format check in the frontend.
    const sutV4Ws = convWebSafeBtoA(sutV4) // Disguise V4 format cosmetically.
    const link = `${config.FRONTEND_URL}/account/sign-up-process/${prefix}${sutV4Ws}`

    // 9. Send email via `Resend`.
    const resend = new Resend(config.resend)
    try {
      await resend.emails.send({
        from: "OchaCoder 🍵 <no-reply@ochacoder.com>",
        to: email,
        subject: "Please verify your email to continue - OchaCoder🍵✨",
        html: `
        <h1>Welcome!</h1>
        <p>Someone requested to create an account with us using this email: <strong>${email}</strong>.</p>
        <p>If that was you, just click the link below to complete your sign-up:</p>
        <br>
        <div><a href="${link}">${link}</a></div>
        <br>
        <p>If you didn’t make this request, you can safely ignore this message — the link will expire in under 3 minutes.</p>
        <p>Have questions? You’re welcome to reach out to us anytime!</p>
        <br>
        <p>—</p>
        <p>Warm regards,</p>
        <p>OchaCoder</p>
        `,
        text: `Please verify your email to continue - ${link}`,
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
        devNotes: ["Regular action - Sent out sign-up token to user's email account."],
      },
    })
  }
}
