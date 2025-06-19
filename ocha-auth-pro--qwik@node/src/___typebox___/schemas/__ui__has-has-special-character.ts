import { Type } from "@sinclair/typebox"

export const UiHasSpecialCharacter = Type.RegExp(/^(.*[!@#$%^&*()\-+={}[\]|\\:;"'<>,.?/~`].*)$/)
