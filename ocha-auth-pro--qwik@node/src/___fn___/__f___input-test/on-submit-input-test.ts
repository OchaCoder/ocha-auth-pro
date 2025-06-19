import type { Ctr } from "~/___ctx___/internal/type-ctr"
import { delayOnBrowser } from "../__f___utils-delay/delay-on-browser"
import { addToast } from "../__f___toast/add-toast"
import { matchPassword } from "./match-password"
import { testEmail } from "./test-email"
import { testName } from "./test-name"
import { testPassword } from "./test-password"
import { testPrevPassword } from "./test-prev-password"

/**
 * Validates a group of inputs and returns a set of actions to:
 * - Check for empty values
 * - Check for valid format
 * - Trigger visual jiggle feedback on invalid fields
 *
 * This is not a real-time validator — it's designed to run once upon form submission.
 *
 * @param ctr - Qwik global controller for triggering UI effects
 * @param target - The input values and flags to validate
 * @returns A set of helper methods: `onErrFxJiggle`, `onErrFxToast`, `isInputValid`
 */
export const onSubmitInputTest = async (
  ctr: Ctr,
  target: {
    name?: { value: string; fx: boolean }
    email?: { value: string; fx: boolean; testType: "full" | "empty" }
    password?: { value: string; valueConfirm: string; fx: boolean; isVisible: boolean; testType: "full" } | { value: string; fx: boolean; isVisible: boolean; testType: "empty" }
    prevPassword?: { value: string; fx: boolean; isVisible: boolean }
  } | null = null
) => {
  if (!target) return { onErrFxJiggle: () => {}, onErrFxToast: () => {}, isInputValid: () => false }

  type Candidate = keyof typeof target
  const keysOfTargetObj = Object.keys(target)

  let errorCounter = 0
  let jiggleArray: string[] = []
  let toastArray: string[] = []

  const prepareErrUi = (result: { success: boolean; jiggle: string[]; message: string[] }) => {
    jiggleArray = jiggleArray.concat(result.jiggle)
    toastArray = toastArray.concat(result.message)
    errorCounter++
  }

  for (const candidate of keysOfTargetObj) {
    switch (candidate as Candidate) {
      case "name": {
        if (target.name === undefined) break

        const result = testName(target.name.value)

        if (!result.success) prepareErrUi(result)

        break
      }

      case "email": {
        if (target.email === undefined) break

        const result = testEmail(target.email.value, target.email.testType)

        if (!result.success) prepareErrUi(result)

        break
      }

      case "password": {
        if (target.password === undefined) break

        const result = testPassword(target.password.value)

        if (!result.success) prepareErrUi(result)

        if (target.password.testType === "empty") break //⚠️ `testType : 'empty'`ends here.

        const resultConfirm = matchPassword(target.password.value, target.password.valueConfirm)

        if (!resultConfirm.success) prepareErrUi(resultConfirm)

        break
      }

      case "prevPassword": {
        if (target.prevPassword === undefined) break

        const result = testPrevPassword(target.prevPassword.value)

        if (!result.success) prepareErrUi(result)

        break
      }
    }
  }

  /**
   * Jiggles the input field with error for 500ms.
   */
  const onErrFxJiggle = async () => {
    if (jiggleArray.includes("name")) target.name!.fx = true
    if (jiggleArray.includes("email")) target.email!.fx = true
    if (jiggleArray.includes("password")) target.password!.fx = true
    if (jiggleArray.includes("prevPassword")) target.prevPassword!.fx = true

    await delayOnBrowser(500)

    if (jiggleArray.includes("name")) target.name!.fx = false
    if (jiggleArray.includes("email")) target.email!.fx = false
    if (jiggleArray.includes("password")) target.password!.fx = false
    if (jiggleArray.includes("prevPassword")) target.prevPassword!.fx = false

    jiggleArray.length = 0
  }

  /**
   * Shows the toast messages with 400ms delay.
   */
  const onErrFxToast = async () => {
    for (const toastMessage of toastArray) {
      addToast(ctr.toast, "yellow", toastMessage)
      await delayOnBrowser(400)
    }
  }

  /**
   * Returns true only when all tests are passed.
   */
  const isInputValid = () => {
    if (errorCounter === 0) return true
    return false
  }

  return { onErrFxJiggle, onErrFxToast, isInputValid }
}
