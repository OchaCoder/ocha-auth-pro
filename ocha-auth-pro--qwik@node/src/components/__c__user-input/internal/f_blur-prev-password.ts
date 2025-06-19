import type { Signal } from "@builder.io/qwik"
import { testPrevPassword } from "~/___fn___/__f___input-test/test-prev-password"

export const blurPrevPassword = (input: { value: string; fx: boolean }, helperMessage: Signal) => {
  if (input.value === "") return

  const { success, message } = testPrevPassword(input.value)

  if (!success) helperMessage.value = message[0]
  else helperMessage.value
}
