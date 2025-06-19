import { Static, Type } from "@sinclair/typebox"

export const PgUserPAUpdatePassword = Type.Object({
  hashed_password: Type.String(),
})

export type TPgUserPAUpdatePassword = Static<typeof PgUserPAUpdatePassword>
