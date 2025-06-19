import type { Signal } from "@builder.io/qwik"
import { testEmail } from "~/___fn___/__f___input-test/test-email"

export const inputEmail = (
  el: HTMLInputElement,
  input: {
    value: string
    fx: boolean
    testType: "full" | "empty"
  },
  timeoutId: Signal,
  helperMessage: Signal
) => {
  timeoutId.value && clearTimeout(timeoutId.value) // Clean up the timeout on re-run.

  input.value = el.value

  helperMessage.value = ""

  if (el.value === "") return // Don’t nag if user clears the field — final check handles it

  const { success, message } = testEmail(input.value, input.testType)

  if (success) return
  else timeoutId.value = window.setTimeout(() => (helperMessage.value = message[0]), 1400)
}
