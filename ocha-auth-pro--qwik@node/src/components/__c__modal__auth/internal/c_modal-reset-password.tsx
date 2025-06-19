import { $, component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik"
import { globalAction$, useNavigate, z, zod$ } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../../../___ctx___/context-global-state"
import { addToast } from "~/___fn___/__f___toast/add-toast"
import { onSubmitInputTest } from "~/___fn___/__f___input-test/on-submit-input-test"
import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolver } from "~/___fn___/__f___io/wretch-resolver"
import { InputEmail, inputTemplate } from "~/components/__c__user-input"
import { modalControl } from "../modal-control"
import { LoadingSpinner } from "~/components/__c_utils__loading-spinner"
import { isAllStable } from "~/___fn___/__f___utils-is-system-stable/is-all-stable"
import style from "./styles.css?inline"
import { setCookieFromClientDangerously } from "~/___fn___/__f___utils-cookies/set-cookie-from-client-dangerously"

export const useUserResetPasswordAction = globalAction$(
  async (input, ev) => {
    const { path, inputBuilder, validator } = ioKit.RA_RESET_PASSWORD_STEP1
    const beInput = inputBuilder(input)

    const rawRes = await wretchResolver(path, beInput, ev)

    if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")
    return rawRes
  },
  zod$(z.object({ email: z.string() }))
)

export const ModalResetPassword = component$(() => {
  useStylesScoped$(style)
  const { ctr, system } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  const email = useStore(inputTemplate.email.testType.full())

  const action = useUserResetPasswordAction()

  const runSubmit = $(async () => {
    if (!isAllStable(system)) return

    const { onErrFxJiggle, onErrFxToast, isInputValid } = await onSubmitInputTest(ctr, { email })
    onErrFxToast()
    onErrFxJiggle()
    if (!isInputValid()) return

    setCookieFromClientDangerously("permit", "yes")
    setCookieFromClientDangerously("email", email.value) // For displaying `email` in the 'account/reset-password-process/email-sent/'

    await action.submit({ email: email.value })

    ctr.authModal.isOpen = false

    if (action.value?.success === true) nav(`/account/reset-password-process/email-sent/ `)
    else if (action.value?.success === false) addToast(ctr.toast, action.value.errorAction.type, action.value.errorAction.message)
  })

  return (
    <>
      <h1 class="auth-modal-title" style={{ width: "180px" }}>
        Reset Password
      </h1>

      <div class={`w-100`}>
        <div class={`grid gap-10 font-size-11 p-10`}>
          <p>If you have forgotten your password, we will send you a password reset link via an email.</p>
          <p>Please enter the email you have signed up with us.</p>
        </div>
      </div>
      <div class="flex flex-column items-center" style={{ gap: "30px" }}>
        <InputEmail input={email} />

        <div
          class={`
              button color-dual-light 
              ${isAllStable(system) ? `hover-button bg-theme-sub hover-bg-theme-sub` : `bg-disabled`}
                `}
          onClick$={runSubmit}>
          {action.isRunning ? <LoadingSpinner /> : `Get a link`}
        </div>
      </div>

      <div class="flex justify-center">
        <div class={`font-size-11`}>
          <span>{`Remembered your password? `}</span>
          <span class="color-theme-sub cursor-pointer" onClick$={() => modalControl.nav.SIGN_IN(ctr)}>
            Sign In!
          </span>
        </div>
      </div>
    </>
  )
})
