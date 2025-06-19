import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik"
import { globalAction$, useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolverProtected } from "~/___fn___/__f___io/wretch-resolver-protected"
import style from "./style.css?inline"
import { addToast } from "~/___fn___/__f___toast/add-toast"
import { deleteCookieFromClient } from "~/___fn___/__f___utils-cookies/delete-cookie-from-client"

import { LoadingSpinner } from "~/components/__c_utils__loading-spinner"

export const useSignOutFromAll = globalAction$(async (_, ev) => {
  const { path, inputBuilder, validator } = ioKit.PA_SIGN_OUT_FROM_ALL
  const beInput = inputBuilder()

  const rawRes = await wretchResolverProtected(path, beInput, ev) // Use `action.isRunning` to implement loading icon.

  if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

  return rawRes
})

export const SignOutFromAll = component$(() => {
  const { ctr, user } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  const signOutFromAll = useSignOutFromAll()

  const runSignOutFromAll = $(async () => {
    await signOutFromAll.submit()

    if (signOutFromAll.value?.success === true) {
      addToast(ctr.toast, "green", "You are successfully signed out!")
      await deleteCookieFromClient()
      nav(`/`)
      user.name = ""
    } else if (signOutFromAll.value?.success === false) {
      addToast(ctr.toast, signOutFromAll.value.errorAction.type, signOutFromAll.value.errorAction.message)
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
      <span class={item} onClick$={runSignOutFromAll}>
        {signOutFromAll.isRunning ? <LoadingSpinner /> : ` From all browsers`}
      </span>
    </>
  )
})
