import { Static, Type } from "@sinclair/typebox"

export const PgUserPLDashTop = Type.Object({
  name: Type.String(),
  email: Type.String(),
  created_at: Type.Date(),
  last_modified_at: Type.Date(),
})

export type TPgUserPLDashTop = Static<typeof PgUserPLDashTop>
