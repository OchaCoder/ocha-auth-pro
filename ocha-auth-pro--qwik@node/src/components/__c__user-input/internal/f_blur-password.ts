import type { Signal } from "@builder.io/qwik"
import { testPassword } from "~/___fn___/__f___input-test/test-password"

export const blurPassword = (
  input:
    | {
        value: string
        valueConfirm: string
        fx: boolean
        testType: "full"
      }
    | {
        value: string
        fx: boolean
        testType: "empty"
      },
  helperMessage: Signal
) => {
  if (input.value === "") return

  const { success, message } = testPassword(input.value, input.testType)

  if (!success) helperMessage.value = message[0]
  else helperMessage.value
}
