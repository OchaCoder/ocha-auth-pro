import { $, component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik"
import { useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { addToast } from "~/___fn___/__f___toast/add-toast"
import { useActionSignIn } from "~/routes/account/sign-in/action"
import { onSubmitInputTest } from "~/___fn___/__f___input-test/on-submit-input-test"
import { InputEmail, InputPassword, inputTemplate } from "~/components/__c__user-input"
import { isAllStable } from "~/___fn___/__f___utils-is-system-stable/is-all-stable"
import { modalControl } from "../modal-control"
import { LoadingSpinner } from "~/components/__c_utils__loading-spinner"
import style from "./styles.css?inline"

export const ModalSignIn = component$(() => {
  useStylesScoped$(style)
  const { ctr, user, system } = useContext(ContextIdGlobalState)
  const nav = useNavigate()

  const email = useStore(inputTemplate.email.testType.empty())
  const password = useStore(inputTemplate.password.testType.empty())

  const action = useActionSignIn()

  const runSubmit = $(async () => {
    if (!isAllStable(system)) return

    const { onErrFxJiggle, onErrFxToast, isInputValid } = await onSubmitInputTest(ctr, { email, password })
    onErrFxJiggle()
    onErrFxToast()
    if (!isInputValid()) return

    await action.submit({ email: email.value, password: password.value })

    if (action.value?.success === true) {
      user.name = action.value.data.userName
      email.value = ""
      password.value = ""
      //ctr.authModal.isOpen = false
      ctr.authModal.type = "CLOSE"
      ctr.authModal.isOpen = false
      console.log("Is this running??🌞🌞🌞🌞")
      nav("/account/dashboard/")
      console.log("Should be navigated now to dashboard...🌞🌞🌞🌞")
    }
    // If there was an error, show toast. (Redirect cases are already handled server-side)
    else if (action.value?.success === false) addToast(ctr.toast, action.value.errorAction.type, action.value.errorAction.message)
  })

  return (
    <>
      <h1 class="auth-modal-title" style={{ width: "160px" }}>
        Sign In
      </h1>

      <div class="flex flex-column items-center" style={{ gap: "30px" }}>
        <InputEmail input={email} />

        <InputPassword input={password} />

        <div
          class={`
                button color-dual-light 
                ${isAllStable(system) ? `hover-button bg-theme-sub hover-bg-theme-sub` : `bg-disabled`}`}
          onClick$={runSubmit}>
          {action.isRunning ? <LoadingSpinner /> : "Sign in"}
        </div>
      </div>
      {/* Options to render different auth components */}
      <div class="grid" style={{ gap: "10px", paddingLeft: "15px" }}>
        <div class={`font-size-11`}>
          <span>Don't have an account?&nbsp;</span>
          <span class="color-theme-sub cursor-pointer " onClick$={() => modalControl.nav.SIGN_UP(ctr)}>
            Join now!
          </span>
        </div>

        <div class={`font-size-11`}>
          <span>To reset your password,&nbsp;</span>
          <span class="color-theme-sub cursor-pointer" onClick$={() => modalControl.nav.RESET_PASSWORD(ctr)}>
            click here!
          </span>
        </div>
      </div>
    </>
  )
})
