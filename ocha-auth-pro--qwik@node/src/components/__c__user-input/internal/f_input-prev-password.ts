import type { Signal } from "@builder.io/qwik"
import { testPrevPassword } from "~/___fn___/__f___input-test/test-prev-password"

export const inputPrevPassword = (
  el: HTMLInputElement,
  input: {
    value: string
    fx: boolean
    isVisible: boolean
  },
  timeoutId: Signal,
  helperMessage: Signal
) => {
  timeoutId.value && clearTimeout(timeoutId.value) // Clean up the timeout on re-run.

  input.value = el.value

  helperMessage.value = ""

  if (el.value === "") return // Don’t nag if user clears the field — final check handles it

  const { success, message } = testPrevPassword(input.value)

  if (success) return
  else timeoutId.value = window.setTimeout(() => (helperMessage.value = message[0]), 1400) // 'NodeJS.Timeout' is not serializable.
}
