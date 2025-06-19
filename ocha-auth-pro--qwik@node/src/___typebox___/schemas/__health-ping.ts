import { Type } from "@sinclair/typebox"

export const HealthPing = Type.Object({
  success: Type.Boolean(),
  data: Type.Object({
    stable: Type.Boolean(),
    time: Type.String({
      pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.source,
      description: "ISO 8601 Date String (UTC, e.g. 2025-05-18T06:30:49.549Z)",
    }),
  }),
})
