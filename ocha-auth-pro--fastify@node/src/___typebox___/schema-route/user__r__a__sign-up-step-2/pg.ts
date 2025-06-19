import { Static, Type } from "@sinclair/typebox"

export const PgUserRASignUpStep2 = Type.Object({
  id: Type.Number(),
})

export type TPgUserRASignUpStep2 = Static<typeof PgUserRASignUpStep2>
