import { Static, Type } from "@sinclair/typebox"

export const RedisUserRAUpdateEmailStep2 = Type.Object({
  isUsed: Type.Boolean(),
})
export type TRedisUserRAUpdateEmailStep2 = Static<typeof RedisUserRAUpdateEmailStep2>
