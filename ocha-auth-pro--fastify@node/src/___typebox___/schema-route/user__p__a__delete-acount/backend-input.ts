import { Static, Type } from "@sinclair/typebox"

export const BiUserPADeleteAccount = Type.Object({
  at: Type.String(),
  payload: Type.Object({
    hasData: Type.Literal(false),
    data: Type.Null(),
  }),
})

export type TBiUserPADeleteAccount = Static<typeof BiUserPADeleteAccount>
