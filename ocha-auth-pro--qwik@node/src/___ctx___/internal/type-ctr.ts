export type Toast = { id: number; type: "green" | "yellow" | "red" | "close"; txt: string }

export type Ctr = {
  isDarkMode: boolean
  authModal: { isOpen: boolean; type: "SIGN_UP" | "SIGN_IN" | "RESET_PASSWORD" | "CLOSE"; locBeforeModal: string }
  mobileMenu: { isOpen: boolean; isRotating: boolean; isReplaced: boolean }
  toast: { arr: Toast[] }
}
