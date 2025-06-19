import { component$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { routeLoader$ } from "@builder.io/qwik-city"
import { redirectIrrelevant } from "~/___fn___/__f___redirect-irrelevant.ts/redirect-irrelevant"
import { getCookieAndDelete } from "~/___fn___/__f___utils-cookies/get-cookie-and-delete"
import { IconSad } from "~/components/__c_utils__svg"
import { ResetPasswordShell } from "../_internal/reset-password-shell"

export const onRequest: RequestHandler = async (ev) => {
  redirectIrrelevant(ev)
  const errMessage = getCookieAndDelete(ev, "err-message")
  ev.sharedMap.set("errMessage", errMessage)
}

export const useLoader = routeLoader$((ev) => {
  const errMessage = ev.sharedMap.get("errMessage")
  return errMessage as string
})

export default component$(() => {
  const errMessage = useLoader().value

  return (
    <>
      <ResetPasswordShell>
        {/* Modal Message */}
        <div class={`p-tb-10 text-center`}>
          <div class={`p-b-5`}>
            <IconSad size={30} fill={`var(--dual-dark)`} />
            <IconSad size={30} fill={`var(--dual-dark)`} />
            <IconSad size={30} fill={`var(--dual-dark)`} />
          </div>

          <h1 class={`font-size-14 color-theme-sub weight-800 p-b-5`}>{errMessage}</h1>

          <div class={`font-size-12`}>Please try again.</div>
        </div>
      </ResetPasswordShell>
    </>
  )
})
