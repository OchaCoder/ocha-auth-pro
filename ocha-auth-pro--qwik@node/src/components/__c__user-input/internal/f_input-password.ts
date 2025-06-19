import type { Signal } from "@builder.io/qwik"
import { testPassword } from "~/___fn___/__f___input-test/test-password"

export const inputPassword = (
  el: HTMLInputElement,
  input:
    | {
        value: string
        valueConfirm: string
        fx: boolean
        isVisible: boolean
        testType: "full"
      }
    | {
        value: string
        fx: boolean
        isVisible: boolean
        testType: "empty"
      },
  timeoutId: Signal,
  helperMessage: Signal
) => {
  timeoutId.value && clearTimeout(timeoutId.value) // Clean up the timeout on re-run.

  input.value = el.value

  helperMessage.value = ""

  if (el.value === "") return // Don’t nag if user clears the field — final check handles it

  const { success, message } = testPassword(input.value, input.testType)

  if (success) return
  else timeoutId.value = window.setTimeout(() => (helperMessage.value = message[0]), 1400) // 'NodeJS.Timeout' is not serializable.
}
