import { Static, Type } from "@sinclair/typebox"

export const PgUserPAUpdateName = Type.Object({
  name: Type.String(),
})

export type TPgUserPAUpdateName = Static<typeof PgUserPAUpdateName>
