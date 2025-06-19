import { Static, Type } from "@sinclair/typebox"

export const BiUserRASignUpStep1 = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      name: Type.String({ minLength: 2, maxLength: 50 }),
      email: Type.String({ format: "email" }),
      password: Type.String({ format: "password" }),
    }),
  }),
})

export type TBiUserRASignUpStep1 = Static<typeof BiUserRASignUpStep1>
