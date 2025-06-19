import { Type } from "@sinclair/typebox"

export const BoUserPLDashTop = Type.Object({
  name: Type.String(),
  email: Type.RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  createdAt: Type.String(),
  lastModifiedAt: Type.String(),
})
