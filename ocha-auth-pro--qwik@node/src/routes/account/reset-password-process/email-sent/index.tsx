import { component$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { routeLoader$ } from "@builder.io/qwik-city"
import { ResetPasswordShell } from "../_internal/reset-password-shell"
import { redirectIrrelevant } from "~/___fn___/__f___redirect-irrelevant.ts/redirect-irrelevant"
import { getCookieAndDelete } from "~/___fn___/__f___utils-cookies/get-cookie-and-delete"

export const onRequest: RequestHandler = async (ev) => {
  redirectIrrelevant(ev)

  const email = getCookieAndDelete(ev, "email")
  ev.sharedMap.set("email", email)
}

export const useLoader = routeLoader$((ev) => {
  const email = ev.sharedMap.get("email")
  return email as string
})

export default component$(() => {
  const email = useLoader().value

  return (
    <>
      <ResetPasswordShell>
        <div class={`flex flex-column gap-10`}>
          <p>
            {`If `}
            <span class={`color-theme-sub weight-800`}>{email}</span>
            {` is associated with us, you will receive a `}
            <strong>password reset link</strong>
            {` shortly.`}
          </p>
          <p>Please check your inbox and spam folder.</p>

          <p>You can safely close this window now!</p>
        </div>
      </ResetPasswordShell>
    </>
  )
})
