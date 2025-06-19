import { Static, Type } from "@sinclair/typebox"

export const BiUserPAUpdateName = Type.Object({
  at: Type.String(),
  payload: Type.Object({
    hasData: Type.Literal(true),
    data: Type.Object({
      name: Type.String({ minLength: 2, maxLength: 50 }),
    }),
  }),
})

export type TBiUserPAUpdateName = Static<typeof BiUserPAUpdateName>
