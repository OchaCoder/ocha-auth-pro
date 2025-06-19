import { $, component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik"
import { useNavigate } from "@builder.io/qwik-city"
import { useActionSignUp } from "~/routes/account/sign-up/action"
import { ContextIdGlobalState } from "../../../___ctx___/context-global-state"
import { addToast } from "~/___fn___/__f___toast/add-toast"
import { PasswordGuide } from "../PasswordGuide"
import { LoadingSpinner } from "~/components/__c_utils__loading-spinner/LoadingSpinner"
import { onSubmitInputTest } from "~/___fn___/__f___input-test/on-submit-input-test"
import { InputEmail, InputName, InputPassword, InputPasswordConfirm, inputTemplate } from "~/components/__c__user-input"
import { isAllStable } from "~/___fn___/__f___utils-is-system-stable/is-all-stable"
import { modalControl } from "../modal-control"
import style from "./styles.css?inline"
import { setCookieFromClientDangerously } from "~/___fn___/__f___utils-cookies/set-cookie-from-client-dangerously"

export const ModalSignUp = component$(() => {
  useStylesScoped$(style)

  const { ctr, system } = useContext(ContextIdGlobalState)

  const nav = useNavigate()

  const name = useStore(inputTemplate.name())
  const email = useStore(inputTemplate.email.testType.full())
  const password = useStore(inputTemplate.password.testType.full())

  const action = useActionSignUp()

  const runSubmit = $(async () => {
    if (!isAllStable(system)) return

    const { onErrFxJiggle, onErrFxToast, isInputValid } = await onSubmitInputTest(ctr, { name, email, password })
    onErrFxJiggle()
    onErrFxToast()
    if (!isInputValid()) return

    await action.submit({ name: name.value, email: email.value, password: password.value })

    if (action.value?.success === true) {
      console.log("🌝action.value is true. start")
      name.value = ""
      email.value = ""
      password.value = ""
      password.valueConfirm = ""
      ctr.authModal.isOpen = false
      //setCookieFromClient("sign-up", "yes", 3)
      setCookieFromClientDangerously("sign-up", "yes")
      nav("/account/sign-up-process/")
      console.log("🌝action.value is true. end")
    }
    // If there was an error, show toast. (Redirect cases are already handled server-side)
    else if (action.value?.success === false) addToast(ctr.toast, action.value.errorAction.type, action.value.errorAction.message)
  })

  return (
    <>
      <h1 class="auth-modal-title" style={{ width: "160px" }}>
        Sign Up
      </h1>

      <div class="flex flex-column items-center" style={{ gap: "20px" }}>
        <InputName input={name} />
        <InputEmail input={email} />
        <InputPassword input={password} />
        <InputPasswordConfirm input={password} />

        <div
          class={`
            button color-dual-light 
            ${isAllStable(system) ? `hover-button bg-theme-sub hover-bg-theme-sub` : `bg-disabled`}
          `}
          onClick$={runSubmit}>
          {action.isRunning ? <LoadingSpinner /> : "Sign Up"}
        </div>
      </div>
      <div class={`flex justify-center font-size-11`}>
        <span>{`Already have an account? `}</span>
        <span class={`color-theme-sub cursor-pointer `} onClick$={() => modalControl.nav.SIGN_IN(ctr)}>
          Sign in!
        </span>
      </div>
      <PasswordGuide value={password.value} />
    </>
  )
})
