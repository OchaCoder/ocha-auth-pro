import { $, component$, useOnWindow } from "@builder.io/qwik"
import { routeLoader$, useNavigate, type RequestHandler } from "@builder.io/qwik-city"

import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolver } from "~/___fn___/__f___io/wretch-resolver"
import { setCookieFromClientDangerously } from "~/___fn___/__f___utils-cookies/set-cookie-from-client-dangerously"
import { Home } from "~/components/__c___layout__home"

/**
 * This route is a hub.
 * It receives `rpt` from the email link, and sends it to the backend (step 2).
 *
 * On success, the user is redirected to proceed to step 3.
 *
 * On error , the user is redirected to `/account/reset-password/error/`.
 *
 */
export const onRequest: RequestHandler = async (ev) => {
  // Redirect irrelevant requests
  const hasPermit = ev.params.rpt && ev.params.rpt.startsWith("puf")
  if (!hasPermit) throw ev.redirect(303, "/hmm/")

  const rptV4Ws = ev.params.rpt.slice(3)

  ev.sharedMap.set("rptV4Ws", rptV4Ws)
}

export const useLoader = routeLoader$(async (ev) => {
  const rptV4Ws = ev.sharedMap.get("rptV4Ws")

  // Continue on to backend operation step 2
  const { path, inputBuilder, validator } = ioKit.RA_RESET_PASSWORD_STEP2
  const beInput = inputBuilder({ rpt: rptV4Ws })
  const rawRes = await wretchResolver(path, beInput, ev)

  if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

  return rawRes
})

export default component$(() => {
  const nav = useNavigate()

  const loader = useLoader().value
  useOnWindow(
    "load",
    $(() => {
      // Step 2 success. Proceed to step 3
      if (loader.success === true) {
        setCookieFromClientDangerously("permit", "yes")
        setCookieFromClientDangerously("rpt", loader.data.rpt)
        setCookieFromClientDangerously("obfuscated", loader.data.obfuscatedEmail)
        throw nav("/account/reset-password-process/")
      }
      // Step 2 error. Render error message
      else if (loader.success === false) {
        setCookieFromClientDangerously("permit", "yes")
        setCookieFromClientDangerously("err-message", loader.errorAction.message)
        throw nav("/account/reset-password-process/error/")
      }
    })
  )
  return (
    <>
      <Home />
    </>
  )
})
