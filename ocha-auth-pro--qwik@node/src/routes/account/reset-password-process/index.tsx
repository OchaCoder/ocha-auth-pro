import { $, component$, useContext, useStore } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { routeAction$, routeLoader$, useNavigate, z, zod$ } from "@builder.io/qwik-city"

import { InputPassword, InputPasswordConfirm, inputTemplate } from "~/components/__c__user-input"
import { isAllStable } from "~/___fn___/__f___utils-is-system-stable/is-all-stable"
import { LoadingSpinner } from "~/components/__c_utils__loading-spinner"
import { PasswordGuide } from "~/components/__c__modal__auth"
import { onSubmitInputTest } from "~/___fn___/__f___input-test"

import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolver } from "~/___fn___/__f___io/wretch-resolver"

import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { setCookieFromClientDangerously } from "~/___fn___/__f___utils-cookies/set-cookie-from-client-dangerously"

import { getCookieAndDelete } from "~/___fn___/__f___utils-cookies/get-cookie-and-delete"
import { ResetPasswordShell } from "./_internal/reset-password-shell"

import { redirectIrrelevant } from "~/___fn___/__f___redirect-irrelevant.ts/redirect-irrelevant"

export const onRequest: RequestHandler = async (ev) => {
  redirectIrrelevant(ev)

  const rpt = getCookieAndDelete(ev, "rpt")
  const obfuscated = getCookieAndDelete(ev, "obfuscated")

  ev.sharedMap.set("rpt", rpt)
  ev.sharedMap.set("obfuscated", obfuscated)
}

export const useLoader = routeLoader$((ev) => {
  const rpt = ev.sharedMap.get("rpt") as string
  const obfuscated = ev.sharedMap.get("obfuscated") as string
  return { rpt, obfuscated }
})

export const useAction = routeAction$(
  async (userInput, ev) => {
    const { path, inputBuilder, validator } = ioKit.RA_RESET_PASSWORD_STEP3
    const beInput = inputBuilder(userInput)
    const rawRes = await wretchResolver(path, beInput, ev)

    if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

    return rawRes
  },

  zod$(
    z.object({
      password: z.string(),
      rpt: z.string(),
    })
  )
)

export default component$(() => {
  const loader = useLoader().value

  const { ctr, system } = useContext(ContextIdGlobalState)

  const nav = useNavigate()

  const action = useAction()

  const password = useStore(inputTemplate.password.testType.full())

  const runSubmit = $(async () => {
    if (!isAllStable(system)) return

    const { onErrFxJiggle, onErrFxToast, isInputValid } = await onSubmitInputTest(ctr, { password })
    onErrFxJiggle(), onErrFxToast()
    if (!isInputValid()) return

    setCookieFromClientDangerously("permit", "yes") // To come back to this route from `routeAction$`
    await action.submit({ password: password.value, rpt: loader.rpt })

    // Case: Success
    if (action.value?.success === true) {
      setCookieFromClientDangerously("permit", "yes") // To go to `/success/`
      nav("/account/reset-password-process/success/")
    }
    // Case: Error
    else if (action.value?.success === false) {
      setCookieFromClientDangerously("permit", "yes") // To go to `/error/`
      setCookieFromClientDangerously("err-message", action.value.errorAction.message)
      nav("/account/reset-password-process/error/")
    }
  })

  return (
    <>
      <ResetPasswordShell>
        <h2 class={`font-size-14 `} style={{ paddingTop: "20px" }}>
          Password Reset for -<div class={`font-size-14 color-theme-sub`}>{loader.obfuscated}</div>
        </h2>

        <div>Enter the new password</div>
        <div class="flex flex-column items-center " style={{ gap: "30px" }}>
          <InputPassword input={password} />
          <InputPasswordConfirm input={password} />

          <div
            class={`
              button color-dual-light 
              ${isAllStable(system) ? `hover-button bg-theme-sub hover-bg-theme-sub` : `bg-disabled`}
          `}
            onClick$={runSubmit}>
            {action.isRunning ? <LoadingSpinner /> : "Update"}
          </div>
        </div>

        <PasswordGuide value={password.value} />
      </ResetPasswordShell>
    </>
  )
})
