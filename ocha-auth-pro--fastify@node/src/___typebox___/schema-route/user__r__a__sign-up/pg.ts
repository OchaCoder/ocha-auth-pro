import { Static, Type } from "@sinclair/typebox"

export const PgUserRASignUp = Type.Object({
  id: Type.Number(),
  name: Type.String(),
})

export type TPgUserRASignUp = Static<typeof PgUserRASignUp>
