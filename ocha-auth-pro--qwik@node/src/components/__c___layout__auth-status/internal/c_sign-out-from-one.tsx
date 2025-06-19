import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik"
import { globalAction$, useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolverProtected } from "~/___fn___/__f___io/wretch-resolver-protected"
import { addToast } from "~/___fn___/__f___toast/add-toast"
import { deleteCookieFromClient } from "~/___fn___/__f___utils-cookies/delete-cookie-from-client"
import { LoadingSpinner } from "~/components/__c_utils__loading-spinner"
import style from "./style.css?inline"

export const useSignOutFromOne = globalAction$(async (_, ev) => {
  const bid = ev.cookie.get("bid")?.value
  if (!bid) throw ev.redirect(303, "/session-expired/")

  const { path, inputBuilder, validator } = ioKit.PA_SIGN_OUT_FROM_ONE

  const beInput = inputBuilder({ bid })

  const rawRes = await wretchResolverProtected(path, beInput, ev) // Use `action.isRunning` to implement loading icon.

  if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

  // ⚠️ Since this is a 'user sign-out' flow, one might be tempted to clear credential cookies here, server-side.
  // This will result in server-side redirect to '/session-expired/' before showing toast message
  // on this component's client-side code, because`routeLoader$` of this route itself requires credential cookies.
  // routeAction$ -> Backend -> routeAction$ ->x-> routeLoader$ -> client-side operation (show toast)

  return rawRes
})

export const SignOutFromOne = component$(() => {
  const { ctr, user } = useContext(ContextIdGlobalState)

  const nav = useNavigate()

  const signOutFromOne = useSignOutFromOne()

  const runSignOutFromOne = $(async () => {
    await signOutFromOne.submit()

    if (signOutFromOne.value?.success === true) {
      addToast(ctr.toast, "green", "You are successfully signed out!")
      await deleteCookieFromClient()
      nav(`/`)
      user.name = ""
    } else if (signOutFromOne.value?.success === false) {
      addToast(ctr.toast, signOutFromOne.value.errorAction.type, signOutFromOne.value.errorAction.message)
    }
  })

  useStylesScoped$(style)
  const item = `
      flex items-center justify-center
      hover-bg-theme-sub hover-color-dual-light color-theme-sub cursor-pointer 
      font-size-10 p-tb-3
      scoped-item
  `

  return (
    <>
      <span class={item} style={{ borderBottom: `solid 1px var(--theme-sub)` }} onClick$={runSignOutFromOne}>
        {signOutFromOne.isRunning ? <LoadingSpinner /> : `From this browser`}
      </span>
    </>
  )
})
