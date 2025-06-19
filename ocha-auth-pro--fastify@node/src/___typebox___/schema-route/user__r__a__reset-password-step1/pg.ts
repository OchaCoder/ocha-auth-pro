import { Static, Type } from "@sinclair/typebox"

export const PgUserRAResetPasswordStep1 = Type.Object({
  id: Type.Number(),
})

export type TPgUserRAResetPasswordStep1 = Static<typeof PgUserRAResetPasswordStep1>
