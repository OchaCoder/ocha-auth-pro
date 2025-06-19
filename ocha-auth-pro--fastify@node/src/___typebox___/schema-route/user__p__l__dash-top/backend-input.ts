import { Static, Type } from "@sinclair/typebox"

export const BiUserPLDashTop = Type.Object({
  at: Type.String(),
  payload: Type.Object({
    hasData: Type.Literal(false),
    data: Type.Null(),
  }),
})

export type TBiUserPLDashTop = Static<typeof BiUserPLDashTop>
