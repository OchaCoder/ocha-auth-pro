import { $, component$, useContext, useOnWindow, useSignal, useTask$ } from "@builder.io/qwik"
import { Link, type RequestHandler, routeLoader$, useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { ioKit } from "~/___fn___/__f___io-kit/io-kit"
import { wretchResolver } from "~/___fn___/__f___io/wretch-resolver"
import { Home } from "~/components/__c___layout__home"
import { IconClose, IconHappy, IconSad } from "~/components/__c_utils__svg"

/**
 * This route serves as the receiver of the token (`uet`) from the email link,
 * and acts as a tunnel with two main responsibilities:
 *
 * -1. Perform a lightweight check on the token (e.g., static prefix validation)
 * -2. Funnel the uet to the actual password setup route ('/password-setup')
 *
 * While this route includes basic protection against abuse, such as rejecting
 * obviously invalid tokens, full validation is intentionally delegated to the backend.
 * The goal is to keep each route clean and focused.
 *
 * Additionally, any irrelevant request to this route will be immediately redirected
 * at the `onRequest` layer without even reaching the `routeLoader$`.
 * This employs better separation of conserns.
 *
 */
export const onRequest: RequestHandler = async (ev) => {
  // Redirects irrelevant access
  if (!(ev.params.uet && ev.params.uet.startsWith("UgMniuvvPDtt2pkPGq_0n"))) throw ev.redirect(303, "/hmm/")

  const uetObjV4Websafe = ev.params.uet.slice(21)

  ev.sharedMap.set("uetObjV4Websafe", uetObjV4Websafe)
}

export const useLoader = routeLoader$(async (ev) => {
  const uetObjV4Websafe = ev.sharedMap.get("uetObjV4Websafe")

  const { path, inputBuilder, validator } = ioKit.RA_UPDATE_EMAIL_STEP2
  const beInput = inputBuilder({ uet: uetObjV4Websafe })
  const rawRes = await wretchResolver(path, beInput, ev)

  if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

  return rawRes
})

export default component$(() => {
  const loader = useLoader().value
  const { user } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  const countDown = useSignal(10)

  useTask$(() => {
    // Email update was successful.
    if (loader.success === true) {
      user.email = loader.data.email
    }
  })

  useOnWindow(
    "load",
    $(() => {
      window.setInterval(() => {
        countDown.value--
        if (countDown.value === 0) nav(`/account/dashboard`)
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
      <title>Update email</title>

      {/* Modal */}
      <div class={`absolute flex items-center justify-center`} style={{ left: 0, top: 0, right: 0, bottom: 0 }}>
        <div
          class={`
            z-3 
            fixed flex flex-column items-center justify-center gap-10 p-10 
            bg-dual-light color-dual-dark
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
          <div class={`p-tb-5 text-center`}>
            {loader.success ? (
              // Success
              <>
                <div>
                  <IconHappy size={30} fill={`var(--dual-dark)`} />
                  <IconHappy size={30} fill={`var(--dual-dark)`} />
                  <IconHappy size={30} fill={`var(--dual-dark)`} />
                </div>
                <h1 class={`font-size-14 weight-800`}>
                  {`Your email was updated to `}
                  <span class={`color-theme-sub`}>{loader.data.email}</span>
                  {`!`}
                </h1>
              </>
            ) : (
              // Error
              <>
                <div>
                  <IconSad size={30} fill={`var(--dual-dark)`} />
                  <IconSad size={30} fill={`var(--dual-dark)`} />
                  <IconSad size={30} fill={`var(--dual-dark)`} />
                </div>

                <h1 class={`font-size-14 color-theme-sub weight-800`}>{loader.errorAction.message}</h1>

                <div class={`font-size-12`}>Please try again.</div>
              </>
            )}
          </div>

          {/* Redirect Message */}
          <div>
            <p>
              {`We will redirect you to `}
              <Link href={`/account/dashboard`} class={`weight-800`}>
                dashboard
              </Link>
              {` in `}
              <span class={`weight-800`}>{countDown.value}</span>
              {` seconds.`}
            </p>
          </div>
        </div>
      </div>
    </>
  )
})
