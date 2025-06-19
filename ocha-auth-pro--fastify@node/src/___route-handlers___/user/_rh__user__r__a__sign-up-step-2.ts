import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import type { TBiUserRASignUpStep2, TPgUserRASignUpStep2 } from "../../___typebox___/index.js"
import argon2 from "argon2"
import { V4 } from "paseto"
import { nanoid } from "nanoid"
import { config } from "../../config.js"
import { genStaggeredTtl, rslvSubFromSutV4Ws } from "../../___fn___/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { runPg } from "../../___postgres___/run/index.js"
import { runRedis } from "../../___redis___/_run/index.js"
import { ErrorDefensiveGuardBreach } from "../../___error___/index.js"

export const rhUserRASignUpStep2 = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extract and rename for convenience
    const { sut: sutV4Ws } = (request.body as TBiUserRASignUpStep2).payload.data

    // 2. Throws at multiple stages during extraction
    const { sut, name, email, password } = await rslvSubFromSutV4Ws(reply, sutV4Ws, `ip:${request.ip}`)

    // 3. Fetch `{ isUsed: boolean }` to prepare for the `isUsed` check. `request.ip` is used as the user identifier.
    const isUsedOrNull = await runRedis.get.obj(fastify, `sign-up:${sut}`, `ip:${request.ip}`, TbV.user.r.a.signUpStep2.redis)

    // 4. This only happens when the network delays (query latencies) or clock skew was greater than 10 seconds.
    if (isUsedOrNull === null) {
      const code = "ERR_REDIS_EXPIRED"
      const message = "Dispite the 10 seconds buffer, { isUsed: boolean } expired before V4 did."
      const context = {
        file: "_rh__user__r__a__update-email-step-2.ts",
        fn: "rhUserRAUpdateEmailStep2",
      }
      throw new ErrorDefensiveGuardBreach(code, message, context)
    }

    // 5. Check if the token has been used before.
    const { isUsed } = isUsedOrNull
    if (isUsed) return reply.status(403).send({ success: false, code: "ERR_SUT_IS_USED" })

    // 6. Update Redis flag as `{ isUsed: true }`. Ensure UX by setting the TTL to 180 seconds.
    runRedis.fireAndForget(fastify, async () => await fastify.redis.set(`sign-up:${sut}`, JSON.stringify({ isUsed: true }), "EX", 60 * 3), `ip:${request.ip}`) // Expires in 180 seconds.

    // 7. Checking stage is over and this sign-up is legit. Hash the `password`
    const hPassword = await argon2.hash(password, config.argon2Config)

    // 8. Insert new user into the database and validate the returned object
    const query = `
              INSERT INTO users(name, email, hashed_password)
              VALUES($1,$2,$3)
              RETURNING id
              `
    const values = [name, email, hPassword]
    const idOrNull = await runPg.query.obj(fastify, query, values, email, TbV.user.r.a.signUpStep2.pg)

    // 9. Extract `id` or throw if `null`
    if (idOrNull === null) {
      const code = `ERR_NO_PG_RETURN`
      const message = `Postgres did not return the inserted user. This should never happen if the exist-check is working. Likely a bug or unexpected DB state.`
      const context = {
        file: `_rh__user__r__a__sign-up.ts`,
        fn: `rhUserRASignUp`,
      }
      throw new ErrorDefensiveGuardBreach(code, message, context)
    }
    const { id } = idOrNull

    // 10. Generate ttl for Redis, Paseto, and cookie
    const exp = genStaggeredTtl()

    // 11. Create `newAt` and `newRt` including `{ id }` as its `sub`
    const newAt = await V4.sign({ sub: JSON.stringify({ id }) }, config.pasetoKeys.secret.at, { expiresIn: exp.at.pasetoExpiresIn })
    const newRt = await V4.sign({ sub: JSON.stringify({ id }) }, config.pasetoKeys.secret.rt, { expiresIn: exp.rt.pasetoExpiresIn })

    // 12. Generate `bid` (browser ID)
    const bid = nanoid()
    await runRedis.fireAndForget(
      fastify,
      async () => {
        // 13. `newRt` in Redis as `bid` its key
        await fastify.redis.set(`browserID:${bid}`, newRt, "EX", exp.rt.redisSetEX)

        // 14. Add `bid` to sorted set with timestamp as score.
        // Necessary for `sign out from one/all` feature.
        await fastify.redis.zadd(`user:${id}:browsers`, Date.now(), bid)
      },
      id
    )

    // 15. Send reply
    return reply.code(200).send({
      success: true,
      data: { userName: name },
      sideEffects: {
        cookie: {
          hasData: true,
          data: {
            newAt: { token: newAt, maxAge: exp.at.cookieMaxAge },
            newBid: { token: bid, maxAge: exp.rt.cookieMaxAge },
          },
        },
        devNotes: ["General action - User signed up"],
      },
    })
  }
}
