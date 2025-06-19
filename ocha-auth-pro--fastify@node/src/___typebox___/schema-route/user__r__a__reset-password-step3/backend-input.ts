import { Static, Type } from "@sinclair/typebox"

export const BiUserRAResetPasswordStep3 = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      password: Type.String({ format: "password" }),
      rpt: Type.String(),
    }),
  }),
})
export type TBiUserRAResetPasswordStep3 = Static<typeof BiUserRAResetPasswordStep3>
