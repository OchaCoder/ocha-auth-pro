import { Static, Type } from "@sinclair/typebox"

export const BiUserRAUpdateEmailStep1 = Type.Object({
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      prev: Type.Object({
        email: Type.String({ format: "email" }),
      }),
      next: Type.Object({
        email: Type.String({ format: "email" }),
      }),
    }),
  }),
})

export type TBiUserRAUpdateEmailStep1 = Static<typeof BiUserRAUpdateEmailStep1>
