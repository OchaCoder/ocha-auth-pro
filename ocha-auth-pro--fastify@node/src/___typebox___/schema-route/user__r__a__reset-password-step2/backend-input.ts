import { Static, Type } from "@sinclair/typebox"

export const BiUserRAResetPasswordStep2 = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      rpt: Type.String(),
    }),
  }),
})
export type TBiUserRAResetPasswordStep2 = Static<typeof BiUserRAResetPasswordStep2>
