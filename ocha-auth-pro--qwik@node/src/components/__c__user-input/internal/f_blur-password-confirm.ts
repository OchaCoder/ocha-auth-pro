import type { Signal } from "@builder.io/qwik"
import { matchPassword } from "~/___fn___/__f___input-test/match-password"

export const blurPasswordConfirm = (
  input: {
    value: string
    valueConfirm: string
    fx: boolean
  },
  helperMessage: Signal
) => {
  const { success, message } = matchPassword(input.value, input.valueConfirm)

  if (!success) helperMessage.value = message[0]
  else helperMessage.value = ""
}
