import { Static, Type } from "@sinclair/typebox"

export const PgUserRAUpdateEmailStep1 = Type.Object({
  id: Type.Number(),
})

export type TPgUserRAUpdateEmailStep1 = Static<typeof PgUserRAUpdateEmailStep1>
