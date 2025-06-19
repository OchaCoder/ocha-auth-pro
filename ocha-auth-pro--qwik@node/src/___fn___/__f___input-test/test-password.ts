import { TbV } from "~/___typebox___/precompiled-validators"

/**
 * Checks the user input.
 * Use `checkType: "minimal"` if only empty check is needed for security reason. (e.g., sign-in)
 *
 * @param value
 * @param checkType
 * @returns
 */
export const testPassword = (
  value: unknown,
  testType: "full" | "empty" = "empty"
): {
  success: boolean
  jiggle: string[]
  message: string[]
} => {
  // 1. Test if the input is of type `string`.
  if (TbV.ui.isString.Check(value)) {
    // The input is now garanteed to be of type `string`.

    // 2. Test if the input is empty.
    if (value === "") {
      return { success: false, jiggle: ["password"], message: ["Password is empty."] }
    }

    // 3. ⚠️ test ends here if `testType` was `empty`.

    if (testType === "empty") return { success: true, jiggle: [], message: [] }

    // 4. Test the length.
    if (!TbV.ui.minLength8.Check(value)) {
      return { success: false, jiggle: ["password"], message: ["Password is too short."] }
    }
    if (!TbV.ui.maxLength50.Check(value)) {
      return { success: false, jiggle: ["password"], message: ["Password is too long."] }
    }

    // 5. Test if the input has the right Password format.
    if (!TbV.ui.hasNumber.Check(value)) {
      return { success: false, jiggle: ["password"], message: ["Password is in the wrong format."] }
    }
    if (!TbV.ui.hasLetter.Check(value)) {
      return { success: false, jiggle: ["password"], message: ["Password is in the wrong format."] }
    }
    if (!TbV.ui.hasSpecialCharacter.Check(value)) {
      return { success: false, jiggle: ["password"], message: ["Password is in the wrong format."] }
    }

    // 6. The input has passed all the tests.
    return { success: true, jiggle: [], message: [] }
  }

  // The input is not a string. This is likely an attack.
  return { success: false, jiggle: [], message: ["Please input valid characters."] }
}
