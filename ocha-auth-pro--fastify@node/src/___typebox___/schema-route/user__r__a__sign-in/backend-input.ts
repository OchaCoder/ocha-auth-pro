import { Static, Type } from "@sinclair/typebox"

export const BiUserRASignIn = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      email: Type.String({ format: "email" }),
      password: Type.String({ format: "password" }),
      bid: Type.Optional(Type.String()),
    }),
  }),
})

export type TBiUserRASignIn = Static<typeof BiUserRASignIn>
