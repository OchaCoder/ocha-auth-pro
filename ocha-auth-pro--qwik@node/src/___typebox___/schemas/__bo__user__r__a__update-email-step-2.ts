import { Type } from "@sinclair/typebox"

export const BoUserRAUpdateEmailStep2 = Type.Object({
  email: Type.RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
})
