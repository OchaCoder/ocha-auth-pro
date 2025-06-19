import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import type { TBiUserRASignIn } from "../../___typebox___/index.js"
import argon2 from "argon2"
import { V4 } from "paseto"
import { nanoid } from "nanoid"
import { config } from "../../config.js"
import { rslvUserIdFromBid, genStaggeredTtl } from "../../___fn___/index.js"
import { TbV } from "../../___typebox___/precompiled-validators.js"
import { runPg } from "../../___postgres___/run/index.js"
import { runRedis } from "../../___redis___/_run/index.js"

export const rhUserRASignIn = (fastify: FastifyInstance) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extract values from `request.body`.
    const { email, password, bid } = (request.body as TBiUserRASignIn).payload.data

    // 2. Use `email` to get `user`.
    const query = `SELECT id, name, email, hashed_password FROM users WHERE email=$1 LIMIT 1`
    const userOrNull = await runPg.query.obj(fastify, query, [email], email, TbV.user.r.a.signIn.pg)

    // 3. Throw if null, else extract user.
    if (userOrNull === null) return reply.status(403).send({ success: false, code: "ERR_UNREGISTERED_SIGNIN_REQUEST" })
    const { id, name, hashed_password } = userOrNull

    // 4. Check the password
    const isPasswordMatching = await argon2.verify(hashed_password, password)
    if (!isPasswordMatching) return reply.status(403).send({ success: false, code: "ERR_PASSWORD_NOT_MATCHING" })

    // 5. Geneate expirations for Redis, Paseto and Cookie
    const exp = genStaggeredTtl()

    // 6. Generate RT/AT
    const newAt = await V4.sign({ sub: JSON.stringify({ id: id }) }, config.pasetoKeys.secret.at, { expiresIn: exp.at.pasetoExpiresIn })
    const newRt = await V4.sign({ sub: JSON.stringify({ id: id }) }, config.pasetoKeys.secret.rt, { expiresIn: exp.rt.pasetoExpiresIn })

    // 6. If `bid` is present, the user is either trying to-
    // 6-1. sign into the same account while signed in => Keep the same browserID in the cookie
    // 6-2. switch account without sign out => Sign out & update cookie with new browserID

    // browserID is present in the cookie.
    if (typeof bid === "string" && bid !== "") {
      const userIdFromRt = await rslvUserIdFromBid(fastify, reply, bid)

      // 6-1. The user is signing into the same account.
      if (userIdFromRt === id) {
        // Keep the current bid in Redis, but only update TTL.
        await runRedis.fireAndForget(fastify, async () => await fastify.redis.set(`browserID:${bid}`, newRt, "EX", exp.rt.redisSetEX), id)

        return reply.code(200).send({
          success: true,
          data: {
            userName: name,
          },
          sideEffects: {
            cookie: {
              hasData: true,
              data: {
                newAt: { token: newAt, maxAge: exp.at.cookieMaxAge },
                newBid: { token: bid, maxAge: exp.rt.cookieMaxAge }, // Same bid, but only update the expiration.
              },
            },
            devNotes: ["sign in operation"],
          },
        })
      }
      // 6-2. The user is switching accounts without logging out.
      // (The user from email look up, and the user from bid/rt didn't match.)
      // userID from bid/rt => Current account to be signed out.
      // userID from email => New account to be switched.
      //
      // 👉Future idea: Trace account switching pattern to detect fraud/hijack
      //
      // logAccountSwitch({
      //   previousUserId: userIdFromRt,
      //   newUserId: id,
      //   bid,
      //   timestamp: Date.now(),
      // })
      else {
        // Sign this user out from the current account

        await runRedis.fireAndForget(
          fastify,
          async () => {
            await fastify.redis.del(`browserID:${bid}`) // Remove one `rt` from Redis, using corresponding `bid`.
            await fastify.redis.zrem(`user:${userIdFromRt}:browsers`, bid) // Remove one `bid` from Redis Set storing all `bid` of this
          },
          id
        )
      }
    }

    // 7. No `bid` in the cookie. This is a fresh sign in.
    const newBid = nanoid()

    await runRedis.fireAndForget(
      fastify,
      async () => {
        // 8. Save the new rt using bid as the key. TTL is in seconds (EX).
        await fastify.redis.set(`browserID:${newBid}`, newRt, "EX", exp.rt.redisSetEX)

        // 9. Add this bid to the Redis Set.
        // 9-1. If the cap of 10 browsers per user is hit, remove the oldest browserID.
        const length = await fastify.redis.zcard(`user:${id}:browsers:`)
        if (length >= 10) await fastify.redis.zpopmin(`user:${id}:browsers:`)

        // 9-2. Create score from the current timestamp
        const score = Date.now()

        // 9-3. Add browserID and score to Ordered Set
        await fastify.redis.zadd(`user:${id}:browsers`, score, newBid)
      },
      id
    )

    // 10. Send reply
    return reply.code(200).send({
      success: true,
      data: { userName: name },
      sideEffects: {
        cookie: {
          hasData: true,
          data: {
            newAt: { token: newAt, maxAge: exp.at.cookieMaxAge },
            newBid: { token: newBid, maxAge: exp.rt.cookieMaxAge },
          },
        },
        devNotes: ["General action - User is signing in."],
      },
    })
  }
}
