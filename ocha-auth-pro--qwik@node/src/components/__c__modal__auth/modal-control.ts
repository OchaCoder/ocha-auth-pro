import type { Ctr } from "~/___ctx___/internal/type-ctr"

const modalCode = {
  SIGN_UP: "SIGN_UP" as const,
  SIGN_IN: "SIGN_IN" as const,
  RESET_PASSWORD: "RESET_PASSWORD" as const,
}
export type ModalCode = keyof typeof modalCode

export const modalControl = {
  code: modalCode,
  open: {
    SIGN_UP: (ctr: Ctr, loc: string) => {
      ctr.authModal.locBeforeModal = loc
      ctr.authModal.type = modalCode.SIGN_UP
      ctr.authModal.isOpen = true
      window.history.pushState({}, "", "/account/sign-up/")
    },

    SIGN_IN: (ctr: Ctr, loc: string) => {
      ctr.authModal.locBeforeModal = loc
      ctr.authModal.type = modalCode.SIGN_IN
      ctr.authModal.isOpen = true
      window.history.pushState({}, "", "/account/sign-in/")
    },

    RESET_PASSWORD: (ctr: Ctr, loc: string) => {
      ctr.authModal.locBeforeModal = loc
      ctr.authModal.type = modalCode.RESET_PASSWORD
      ctr.authModal.isOpen = true
      window.history.pushState({}, "", "/account/reset-password/")
    },
  },

  nav: {
    SIGN_UP: (ctr: Ctr) => {
      ctr.authModal.type = modalCode.SIGN_UP
      window.history.pushState({}, "", "/account/sign-up/")
    },

    SIGN_IN: (ctr: Ctr) => {
      ctr.authModal.type = modalCode.SIGN_IN
      window.history.pushState({}, "", "/account/sign-in/")
    },

    RESET_PASSWORD: (ctr: Ctr) => {
      ctr.authModal.type = modalCode.RESET_PASSWORD
      window.history.pushState({}, "", "/account/reset-password/")
    },
  },

  close: (ctr: Ctr) => {
    ctr.authModal.type = modalCode.SIGN_IN
    ctr.authModal.isOpen = false
    window.history.pushState({}, "", ctr.authModal.locBeforeModal)
  },
}
