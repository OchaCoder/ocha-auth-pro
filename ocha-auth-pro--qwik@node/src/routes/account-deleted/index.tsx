import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { Link, useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { deleteCookieFromServer } from "~/___fn___/__f___utils-cookies/delete-cookie-from-server"
import { IconHappy } from "~/components/__c_utils__svg"

export const onRequest: RequestHandler = async (ev) => {
  const isAllowed = ev.cookie.get("account-deleted")?.value === "yes"
  ev.cookie.delete("account-deleted", { path: "/" })
  deleteCookieFromServer(ev)

  if (!isAllowed) throw ev.redirect(303, `/`)
}

export default component$(() => {
  const { user } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  const countDown = useSignal(10)

  useTask$(() => {
    user.email = ""
    user.name = ""
    user.rpt = ""

    setInterval(() => {
      countDown.value--
      if (countDown.value === 0) nav(`/`)
    }, 1000)
  })

  return (
    <>
      <div class={`grid justify-center text-center`} style={{ padding: "30px", gap: "30px", marginBottom: `30px` }}>
        <div>
          <div>
            <IconHappy size={30} fill={`var(--dual-dark)`} />
            <IconHappy size={30} fill={`var(--dual-dark)`} />
            <IconHappy size={30} fill={`var(--dual-dark)`} />
          </div>
          <h1 class={`font-size-14 color-theme-sub weight-800`}>Your account was deleted successfully. </h1>
        </div>

        <div class={`font-size-12`}>Thank you for trying us out!</div>
        <div>
          <span>
            {`We will redirect you to `}
            <Link href={`/`}>home</Link>
            {` in `}
            <span class={`weight-800 color-theme-sub`}>{countDown.value}</span>
            {` second.`}
          </span>
        </div>
      </div>
    </>
  )
})
