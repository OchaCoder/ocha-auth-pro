export const matchPassword = (value: string, valueConfirm: unknown): { success: boolean; jiggle: string[]; message: string[] } => {
  if (value !== valueConfirm) {
    return { success: false, jiggle: ["password"], message: ["Passwords are not matching."] }
  }
  return { success: true, jiggle: [], message: [] }
}
