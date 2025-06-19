import { Static, Type } from "@sinclair/typebox"

export const BiUserPASignOutFromAll = Type.Object({
  at: Type.String(),
  payload: Type.Object({
    hasData: Type.Literal(false),
    data: Type.Null(),
  }),
})

export type TBiUserPASignOutFromAll = Static<typeof BiUserPASignOutFromAll>
