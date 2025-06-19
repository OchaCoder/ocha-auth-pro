import { Static, Type } from "@sinclair/typebox"

export const BiUserPASignOutFromOne = Type.Object({
  at: Type.String(),
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      bid: Type.String(),
    }),
  }),
})

export type TBiUserPASignOutFromOne = Static<typeof BiUserPASignOutFromOne>
