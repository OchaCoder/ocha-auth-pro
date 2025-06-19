import { Static, Type } from "@sinclair/typebox"

export const RedisUserRASignUpStep2 = Type.Object({
  isUsed: Type.Boolean(),
})
export type TRedisUserRASignUpStep2 = Static<typeof RedisUserRASignUpStep2>
