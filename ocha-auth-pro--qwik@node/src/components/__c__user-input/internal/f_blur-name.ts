import type { Signal } from "@builder.io/qwik"
import { testName } from "~/___fn___/__f___input-test/test-name"

/**
 * If the user quickly clicks away while the input value is empty or invalid,
 * show the helper text immediately without the delayed update from `unInputOp`.
 *
 * @param input - { value: string; fx: boolean }
 * @param helperMessage - A string signal
 */
export const blurName = (
  input: {
    value: string
    fx: boolean
  },
  helperMessage: Signal
) => {
  if (input.value === "") return // Don’t nag if user leaves input empty — final check handles it

  const { success, message } = testName(input.value)

  if (!success) helperMessage.value = message[0]
  else helperMessage.value = ""
}
