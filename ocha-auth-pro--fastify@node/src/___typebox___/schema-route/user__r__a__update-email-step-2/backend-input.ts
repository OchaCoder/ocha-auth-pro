import { Static, Type } from "@sinclair/typebox"

// Request body @userUpdate
export const BiUserRAUpdateEmailStep2 = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      uet: Type.String(),
    }),
  }),
})

export type TBiUserRAUpdateEmailStep2 = Static<typeof BiUserRAUpdateEmailStep2>
