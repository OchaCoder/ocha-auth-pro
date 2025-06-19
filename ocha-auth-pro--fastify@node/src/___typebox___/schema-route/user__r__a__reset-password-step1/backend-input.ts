import { Static, Type } from "@sinclair/typebox"

// Request body @userResetPasswordPreEmail
export const BiUserRAResetPasswordStep1 = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      email: Type.String({ format: "email" }),
    }),
  }),
})
export type TBiUserRAResetPasswordStep1 = Static<typeof BiUserRAResetPasswordStep1>
