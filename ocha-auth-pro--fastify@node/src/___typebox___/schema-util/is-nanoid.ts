import { Type } from "@sinclair/typebox"

export const IsNanoId = Type.String({
  minLength: 21,
  maxLength: 21,
  pattern: "^[a-zA-Z0-9_-]+$",
  description: "NanoID (21 chars, URL-safe)",
})
