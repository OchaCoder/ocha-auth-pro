import { Static, Type } from "@sinclair/typebox"

export const BiUserPAUpdatePassword = Type.Object({
  at: Type.String(),
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      prev: Type.Object({
        password: Type.String({ format: "password" }),
      }),
      next: Type.Object({
        password: Type.String({ format: "password" }),
      }),
    }),
  }),
})

export type TBiUserPAUpdatePassword = Static<typeof BiUserPAUpdatePassword>
