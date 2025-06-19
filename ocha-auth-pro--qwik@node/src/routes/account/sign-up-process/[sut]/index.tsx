import { $, component$, useContext, useOnWindow, useSignal, useTask$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { Link, routeLoader$, useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolver } from "~/___fn___/__f___io/wretch-resolver"
import { setCookieFromServer } from "~/___fn___/__f___utils-cookies/set-cookie-from-server"
import { webSafeBtoA } from "~/___fn___/__f___utils-web-safe-64/web-safe-b-to-a"
import { Home } from "~/components/__c___layout__home"
import { IconClose } from "~/components/__c_utils__svg"
import { SignUpSuccess } from "./internal/__c__success"
import { SignUpError } from "./internal/__c__error"

/**
 *
 * This route receives `sut` via email link, and forwards it to the backend.
 * The received result is displayed as a modal for 10 seconds, after which
 * the user is redirected to either `/account/dashboard` or `/`.
 *
 */
export const onRequest: RequestHandler = async (ev) => {
  // Redirect irrelevant access
  if (!(ev.params.sut && ev.params.sut.startsWith("IfUW_ZkG6_eEHb9UD-aRn"))) throw ev.redirect(303, "/hmm/")

  const sutV4Ws = ev.params.sut.slice(21)

  ev.sharedMap.set("sutV4Ws", sutV4Ws)
}

export const useLoader = routeLoader$(async (ev) => {
  const sutV4Ws = ev.sharedMap.get("sutV4Ws")

  // Send the `uet` to the backend for verification and email update process
  const { path, inputBuilder, validator } = ioKit.RA_SIGN_UP_STEP2
  const beInput = inputBuilder({ sut: sutV4Ws })
  const rawRes = await wretchResolver(path, beInput, ev)

  if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

  if (rawRes.success && rawRes.sideEffects.cookie.hasData) {
    setCookieFromServer(ev.cookie, "at", rawRes.sideEffects.cookie.data.newAt.token, rawRes.sideEffects.cookie.data.newAt.maxAge)
    setCookieFromServer(ev.cookie, "bid", rawRes.sideEffects.cookie.data.newBid.token, rawRes.sideEffects.cookie.data.newBid.maxAge)
    setCookieFromServer(ev.cookie, "uid", webSafeBtoA(rawRes.data.userName), 60 * 60 * 24 * 30 * 6)
  }

  return rawRes
})

export default component$(() => {
  const loader = useLoader().value
  const { user } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  const countDown = useSignal(10)

  useTask$(() => {
    // Sign-up was successful
    if (loader.success === true) {
      user.name = loader.data.userName
    }
  })

  // Redirect after 10 seconds
  useOnWindow(
    "load",
    $(() => {
      window.setInterval(() => {
        countDown.value--
        if (countDown.value === 0) {
          // Sign-up was successful
          if (loader.success === true) nav(`/account/dashboard`)
          // Sign-up failed
          else if (loader.success === false) nav(`/`)
        }
      }, 1000)
    })
  )

  return (
    <>
      {/* Display `<Home />` as the background of the overlay */}
      <div class={`fixed overflow-hidden`} style={{ left: 0, top: 0, right: 0, bottom: 0 }}>
        <Home />
      </div>

      {/* Overlay */}
      <Link href={`/account/dashboard`} class={`z-2 absolute cursor-auto`} style={{ left: 0, top: 0, right: 0, bottom: 0, backgroundColor: "#00000080", backdropFilter: "blur(8px)" }} />

      {/* Modal */}
      <div class={`absolute flex items-center justify-center`} style={{ left: 0, top: 0, right: 0, bottom: 0 }}>
        <div
          class={`
             z-3 fixed 
             flex flex-column items-center justify-center gap-10
             p-10 bg-dual-light color-dual-dark
             `}
          style={{
            maxWidth: `500px`,
            width: `85%`,
            borderRadius: `10px`,
            border: `solid 5px var(--theme-sub)`,
          }}>
          {/* Close Button */}
          <Link href={`/account/dashboard`} class={`absolute cursor-pointer`} style={{ top: `5px`, right: `5px` }} onClick$={() => nav(`/account/dashboard`)}>
            <IconClose size={30} fill={`var(--theme-sub)`} />
          </Link>

          {/* Modal Message */}
          <div class={`p-tb-5 text-center`}>{loader.success ? <SignUpSuccess countDown={countDown.value} /> : <SignUpError countDown={countDown.value} errMessage={loader.errorAction.message} />}</div>
        </div>
      </div>
    </>
  )
})
