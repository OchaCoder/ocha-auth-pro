import { TbV } from "~/___typebox___/precompiled-validators"

export const testEmail = (value: unknown, testType: "full" | "empty" = "empty"): { success: boolean; jiggle: string[]; message: string[] } => {
  // 1. Test if the input is of type `string`.

  if (TbV.ui.isString.Check(value)) {
    // The input is now garanteed to be of type `string`.

    // 2. Test if the input is empty.
    if (value === "") {
      return { success: false, jiggle: ["email"], message: ["Email is empty."] }
    }

    // ⚠️ test ends here if `testType` was `empty`.
    if (testType === "empty") return { success: true, jiggle: [], message: [] }

    // 3. Test the length
    if (!TbV.ui.minLength4.Check(value)) {
      return { success: false, jiggle: ["email"], message: ["Email is too short."] }
    }
    if (!TbV.ui.maxLength50.Check(value)) {
      return { success: false, jiggle: ["email"], message: ["Email is too long."] }
    }

    // 4. Test if the input has the right email format.
    if (!TbV.ui.email.Check(value)) {
      return { success: false, jiggle: ["email"], message: ["Email is in the wrong format."] }
    }

    // 5. The input has passed all the tests.
    return { success: true, jiggle: [], message: [] }
  }
  // The input is not a string. This is likely an attack.
  return { success: false, jiggle: [], message: ["Please input valid characters."] }
}
