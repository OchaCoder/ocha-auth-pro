import { Type } from "@sinclair/typebox"

export const HealthSseInfra = Type.Object({
  success: Type.Literal(true),
  data: Type.Object({
    stable: Type.Boolean(),
    initialCheck: Type.Boolean(),
  }),
})
