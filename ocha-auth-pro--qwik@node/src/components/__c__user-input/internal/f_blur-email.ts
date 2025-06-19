import type { Signal } from "@builder.io/qwik"
import { testEmail } from "~/___fn___/__f___input-test/test-email"

export const blurEmail = (
  input: {
    value: string
    fx: boolean
    testType: "full" | "empty"
  },
  helperMessage: Signal
) => {
  if (input.value === "") return // Don’t nag if user leaves input empty — final check handles it

  const { success, message } = testEmail(input.value, input.testType)

  if (!success) helperMessage.value = message[0]
  else helperMessage.value = ""
}
