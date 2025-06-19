import { TypeSystem } from "@sinclair/typebox/system"

TypeSystem.Format("email", (value) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
})
