export const storeTemplate = {
  name: () => ({ value: "", fx: false }),
  email: {
    testType: {
      full: () => ({ value: "", fx: false, testType: "full" as const }),
      empty: () => ({ value: "", fx: false, testType: "empty" as const }),
    },
  },
  password: {
    testType: {
      full: () => ({ value: "", valueConfirm: "", fx: false, isVisible: false, testType: "full" as const }),
      empty: () => ({ value: "", fx: false, isVisible: false, testType: "empty" as const }),
    },
  },
  prevpassword: () => ({ value: "", fx: false, isVisible: false }),
}

export type EmailInputFull = {
  value: string
  fx: boolean
  testType: "full"
}
export type EmailInputEmpty = {
  value: string
  fx: boolean
  testType: "empty"
}
export type PasswordInputFull = {
  value: string
  valueConfirm: string
  fx: boolean
  isVisible: boolean
  testType: "full"
}
export type PasswordInputEmpty = {
  value: string
  fx: boolean
  isVisible: boolean
  testType: "empty"
}
