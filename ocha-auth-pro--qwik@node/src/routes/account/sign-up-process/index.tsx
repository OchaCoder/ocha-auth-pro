import { component$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { IconHappy } from "~/components/__c_utils__svg"

/**
 * This route is a simple landing page after the user has submitted the sign-up info to the server.
 * The user is expected to click the link in the email to complete the sign-up process.
 */
export const onRequest: RequestHandler = async (ev) => {
  const isAllowed = ev.cookie.get("sign-up")?.value === "yes"
  ev.cookie.delete("sign-up", { path: "/" })

  if (!isAllowed) throw ev.redirect(303, `/`)
}

export default component$(() => {
  return (
    <>
      <div class={`flex flex-column items-center justify-center gap-10`} style={{ padding: "30px", marginBottom: `30px` }}>
        <div class={`flex`}>
          <IconHappy fill={`var(--dual-dark)`} />
          <IconHappy fill={`var(--dual-dark)`} />
          <IconHappy fill={`var(--dual-dark)`} />
        </div>
        <div>
          <h1 class={`font-size-14 color-theme-sub weight-800`}>Thank you for signing up!</h1>
        </div>

        <div class={`font-size-12`}>An email was sent to your address containing a link to verify your email address.</div>
        <div class={`font-size-12`}>You can safely close this window now!</div>
      </div>
    </>
  )
})
