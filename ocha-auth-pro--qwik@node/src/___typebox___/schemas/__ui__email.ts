import { Type } from "@sinclair/typebox"

export const UiEmail = Type.RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
