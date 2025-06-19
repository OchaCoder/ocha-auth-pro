import { Type } from "@sinclair/typebox"

export const IsDecryptedV4Obj = Type.Object({
  sub: Type.String(),
  iat: Type.String(),
  exp: Type.String(),
})
