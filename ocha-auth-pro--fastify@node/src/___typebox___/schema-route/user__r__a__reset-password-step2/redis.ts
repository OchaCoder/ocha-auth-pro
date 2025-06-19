import { Static, Type } from "@sinclair/typebox"

export const RedisUserRAResetPasswordStep2 = Type.Object({
  isUsed: Type.Boolean(),
})
export type TRedisUserRAResetPasswordStep2 = Static<typeof RedisUserRAResetPasswordStep2>
