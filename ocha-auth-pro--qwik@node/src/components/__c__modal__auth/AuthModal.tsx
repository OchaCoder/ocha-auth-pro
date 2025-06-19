import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik"
import { ModalAuthOverlay } from "./internal/c_modal-auth-overlay"
import { ModalSignUp } from "./internal/c_modal-sign-up"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import styles from "./internal/styles.css?inline"
import { ModalSignIn } from "./internal/c_modal-sign-in"
import { ModalResetPassword } from "./internal/c_modal-reset-password"
import { ModalAuthShell } from "./internal/c_modal-auth-shell"

export const AuthModal = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)

  useStylesScoped$(styles)

  return (
    <>
      <ModalAuthOverlay />

      <ModalAuthShell>
        <div class={`grid gap-15 transition-opacity ${ctr.authModal.type === "CLOSE" ? `hidden opacity-0 absolute` : `visible opacity-1`}`}>
          {ctr.authModal.type === "SIGN_UP" && <ModalSignUp />}
          {ctr.authModal.type === "SIGN_IN" && <ModalSignIn />}
          {ctr.authModal.type === "RESET_PASSWORD" && <ModalResetPassword />}
        </div>
      </ModalAuthShell>
    </>
  )
})
