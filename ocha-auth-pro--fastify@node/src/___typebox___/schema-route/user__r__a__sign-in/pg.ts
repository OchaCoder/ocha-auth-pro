import { Static, Type } from "@sinclair/typebox"

export const PgUserRASignIn = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" }),
  hashed_password: Type.String(),
})

export type TPgUserRASignIn = Static<typeof PgUserRASignIn>
