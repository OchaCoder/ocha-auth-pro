import { Type } from "@sinclair/typebox"

export const BoUserRAResetPasswordStep2 = Type.Object({
  rpt: Type.String(),
  obfuscatedEmail: Type.String(),
})
