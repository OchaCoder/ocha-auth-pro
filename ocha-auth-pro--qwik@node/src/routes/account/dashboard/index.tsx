import { $, component$, useContext, useStore, useTask$ } from "@builder.io/qwik"
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city"
import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolverProtected } from "~/___fn___/__f___io/wretch-resolver-protected"
import { DashboardEditEmail, DashboardEditName, DashboardEditPassword, DashboardSectionSlot } from "./_internal"
import { InputEmail, InputName, InputPassword, InputPasswordConfirm, InputPrevPassword, inputTemplate } from "~/components/__c__user-input"
import { DashboardEditDelete } from "./_internal/c_dashboard-edit-delete"
import { wretchResolver } from "~/___fn___/__f___io/wretch-resolver"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { setCookieFromClient } from "~/___fn___/__f___utils-cookies/set-cookie-from-client"
import { webSafeBtoA } from "~/___fn___/__f___utils-web-safe-64/web-safe-b-to-a"
import { addToast } from "~/___fn___/__f___toast/add-toast"
import { LoadingSpinner } from "~/components/__c_utils__loading-spinner"
import { onSubmitInputTest } from "~/___fn___/__f___input-test"

import { setCookieFromServer } from "~/___fn___/__f___utils-cookies/set-cookie-from-server"
import { PasswordGuide } from "~/components/__c__modal__auth"

export const useDashboardLoader = routeLoader$(async (ev) => {
  const { path, inputBuilder, validator } = ioKit.PL_DASH_TOP
  const beInput = inputBuilder()

  const rawRes = await wretchResolverProtected(path, beInput, ev)

  if (!validator.Check(rawRes)) throw ev.redirect(302, "/hmm")
  if (!rawRes.success) throw ev.redirect(302, "/oops")

  return rawRes
})

// Action 1: Update Name (Protected)
export const useUpdtNameAct = routeAction$(
  async (userInput, ev) => {
    const { path, inputBuilder, validator } = ioKit.PA_UPDATE_NAME
    const beInput = inputBuilder(userInput)

    const rawRes = await wretchResolverProtected(path, beInput, ev)

    if (!validator.Check(rawRes)) throw ev.redirect(302, "/hmmm")

    return rawRes
  },
  zod$(
    z.object({
      name: z.string(),
    })
  )
)

// Action 2: Update Email (Regular)
export const useUpdtEmailStep1Act = routeAction$(
  async (userInput, ev) => {
    const { path, inputBuilder, validator } = ioKit.RA_UPDATE_EMAIL_STEP1
    const beInput = inputBuilder(userInput)

    const rawRes = await wretchResolver(path, beInput, ev)

    if (!validator.Check(rawRes)) throw ev.redirect(302, "/hmmm")

    return rawRes
  },
  zod$(
    z.object({
      prev: z.object({
        email: z.string(),
      }),
      next: z.object({
        email: z.string(),
      }),
    })
  )
)

// Action 3: Update Password (Protected
export const useUpdtPasswordAct = routeAction$(
  async (userInput, ev) => {
    const { path, inputBuilder, validator } = ioKit.PA_UPDATE_PASSWORD
    const beInput = inputBuilder(userInput)

    const rawRes = await wretchResolverProtected(path, beInput, ev)

    if (!validator.Check(rawRes)) throw ev.redirect(302, "/hmmm")

    return rawRes
  },
  zod$(
    z.object({
      prev: z.object({
        password: z.string(),
      }),
      next: z.object({
        password: z.string(),
      }),
    })
  )
)

// Action 4: Delete Account (Protected)
export const useDltAccountAct = routeAction$(async (_, ev) => {
  const { path, inputBuilder, validator } = ioKit.PA_DELETE_ACCOUNT
  const beInput = inputBuilder()

  const rawRes = await wretchResolverProtected(path, beInput, ev)

  if (!validator.Check(rawRes)) throw ev.redirect(302, "/hmmm")

  if (rawRes.success === true) {
    setCookieFromServer(ev.cookie, "account-deleted", "yes", 3)
    throw ev.redirect(302, `/account-deleted/`)
  }

  return rawRes
})

export default component$(() => {
  const { ctr, user } = useContext(ContextIdGlobalState)
  const loader = useDashboardLoader().value.data

  const updtNameAct = useUpdtNameAct()
  const updtEmailStep1Act = useUpdtEmailStep1Act()
  const updtPasswordAct = useUpdtPasswordAct()
  const dltAccountAct = useDltAccountAct()

  const nextName = useStore(inputTemplate.name())
  const nextEmail = useStore(inputTemplate.email.testType.full())
  const prevPassword = useStore(inputTemplate.prevpassword())
  const nextPassword = useStore(inputTemplate.password.testType.full())

  useTask$(() => {
    user.email = loader.email
  })

  // Fn 1: Update Name
  const updtName = $(async () => {
    const userInput = { name: nextName.value }

    const { onErrFxJiggle, onErrFxToast, isInputValid } = await onSubmitInputTest(ctr, { name: nextName })
    onErrFxJiggle()
    onErrFxToast()
    if (!isInputValid()) return

    await updtNameAct.submit(userInput)

    // Success
    if (updtNameAct.value?.success) {
      user.name = updtNameAct.value.data.name
      nextName.value = ""
      // Update user in cookie
      setCookieFromClient("uid", webSafeBtoA(updtNameAct.value.data.name), 60 * 60 * 24 * 30 * 6)
    }

    // Error
    else if (updtNameAct.value?.success === false) {
      addToast(ctr.toast, updtNameAct.value?.errorAction.type, updtNameAct.value.errorAction.message)
    }
  })

  // Fn 2: Update Email
  const updtEmail = $(async () => {
    const userInput = { prev: { email: loader.email }, next: { email: nextEmail.value } }

    const { onErrFxJiggle, onErrFxToast, isInputValid } = await onSubmitInputTest(ctr, { email: nextEmail })
    onErrFxJiggle()
    onErrFxToast()
    if (!isInputValid()) return

    await updtEmailStep1Act.submit(userInput)

    // Success
    if (updtEmailStep1Act.value?.success === true) {
      addToast(ctr.toast, "green", `A confirmation link has been sent to ${nextEmail.value}.`)
      nextEmail.value = ""
    }
    // Error
    else if (updtEmailStep1Act.value?.success === false) {
      addToast(ctr.toast, updtEmailStep1Act.value?.errorAction.type, updtEmailStep1Act.value.errorAction.message)
    }
  })

  // Fn 3: Update Password
  const updtPassword = $(async () => {
    const userInput = { prev: { password: prevPassword.value }, next: { password: nextPassword.value } }

    const test1 = await onSubmitInputTest(ctr, { prevPassword: prevPassword })
    const test2 = await onSubmitInputTest(ctr, { password: nextPassword })
    test1.onErrFxJiggle()
    test1.onErrFxToast()
    test2.onErrFxJiggle()
    test2.onErrFxToast()
    if (!test1.isInputValid() || !test2.isInputValid()) return

    await updtPasswordAct.submit(userInput)

    // Success
    if (updtPasswordAct.value?.success === true) {
      addToast(ctr.toast, "green", `Password is successfully updated.`)
      prevPassword.value = ""
      nextPassword.value = ""
      nextPassword.valueConfirm = ""
    }
    // Error
    else if (updtPasswordAct.value?.success === false) {
      addToast(ctr.toast, updtPasswordAct.value?.errorAction.type, updtPasswordAct.value.errorAction.message)
    }
  })

  // Fn 4: Delete Account
  const dltAccount = $(async () => {
    await dltAccountAct.submit()
    // Delete failed
    if (dltAccountAct.value?.success === false) {
      addToast(ctr.toast, dltAccountAct.value?.errorAction.type, dltAccountAct.value.errorAction.message)
    }
  })

  return (
    <>
      <div class={`w-100 flex justify-center items-center`}>
        <div class={`flex flex-column justify-center p-5`} style={{ gap: "10px", minWidth: "375px", maxWidth: "600px" }}>
          <h2 class={`font-size-16 color-theme-sub`}>User Dashboard</h2>
          <DashboardSectionSlot title={`Name`}>
            <DashboardEditName name={user.name} />
            <div style={{ maxWidth: `400px`, paddingBottom: `22px` }}>
              <InputName input={nextName} />
            </div>
            <div class={`button hover-button bg-theme-sub hover-bg-theme-sub color-dual-light`} onClick$={updtName}>
              {updtNameAct.isRunning ? <LoadingSpinner /> : `Update`}
            </div>
          </DashboardSectionSlot>

          <div style={{ paddingTop: "15px" }} />

          <DashboardSectionSlot title={`Email`}>
            <DashboardEditEmail email={user.email} />
            <div style={{ maxWidth: `400px`, paddingBottom: `22px` }}>
              <InputEmail input={nextEmail} />
            </div>
            <div class={`button hover-button bg-theme-sub hover-bg-theme-sub color-dual-light`} onClick$={updtEmail}>
              {updtEmailStep1Act.isRunning ? <LoadingSpinner /> : `Update`}
            </div>
          </DashboardSectionSlot>

          <div style={{ paddingTop: "15px" }} />

          <DashboardSectionSlot title={`Password`}>
            <DashboardEditPassword />
            <div class={`flex flex-column`} style={{ maxWidth: `400px`, paddingBottom: `22px`, gap: "15px" }}>
              <h4 class="font-size-10">Old Password</h4>
              <InputPrevPassword input={prevPassword} />

              <div style={{ margin: `10px 0`, borderBottom: `solid 1px #cacaca`, width: `150px` }} />

              <h4 class="font-size-10">New Password</h4>
              <InputPassword input={nextPassword} />
              <InputPasswordConfirm input={nextPassword} />
              <PasswordGuide value={nextPassword.value} />
            </div>
            <div class={`button hover-button bg-theme-sub hover-bg-theme-sub color-dual-light`} onClick$={updtPassword}>
              {updtPasswordAct.isRunning ? <LoadingSpinner /> : `Update`}
            </div>
          </DashboardSectionSlot>

          <div style={{ paddingTop: "15px" }} />

          <DashboardSectionSlot title={`Delete Account`}>
            <DashboardEditDelete />
            <div class={`button hover-button bg-strawberry hover-bg-strawberry color-dual-light`} onClick$={dltAccount}>
              {dltAccountAct.isRunning ? <LoadingSpinner /> : `Delete Account`}
            </div>
          </DashboardSectionSlot>
        </div>
      </div>
    </>
  )
})
