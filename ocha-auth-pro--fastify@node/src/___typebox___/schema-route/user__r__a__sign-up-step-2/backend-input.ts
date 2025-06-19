import { Static, Type } from "@sinclair/typebox"

export const BiUserRASignUpStep2 = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      sut: Type.String(),
    }),
  }),
})

export type TBiUserRASignUpStep2 = Static<typeof BiUserRASignUpStep2>
