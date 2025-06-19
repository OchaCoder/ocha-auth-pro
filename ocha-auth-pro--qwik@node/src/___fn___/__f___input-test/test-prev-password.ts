import { TbV } from "~/___typebox___/precompiled-validators"

/**
 * @param value
 * @returns
 */
export const testPrevPassword = (
  value: unknown
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
      return { success: false, jiggle: ["prevPassword"], message: ["Old password is empty."] }
    }

    // 3. The input has passed all the tests.
    return { success: true, jiggle: [], message: [] }
  }

  // The input is not a string. This is likely an attack.
  return { success: false, jiggle: [], message: ["Please input valid characters."] }
}
