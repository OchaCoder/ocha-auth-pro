import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { Link, useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { redirectIrrelevant } from "~/___fn___/__f___redirect-irrelevant.ts/redirect-irrelevant"
import { IconHappy } from "~/components/__c_utils__svg"
import { ResetPasswordShell } from "../_internal/reset-password-shell"

export const onRequest: RequestHandler = async (ev) => {
  redirectIrrelevant(ev)
}

export default component$(() => {
  const countDown = useSignal(10)
  const { ctr } = useContext(ContextIdGlobalState)
  const nav = useNavigate()

  useTask$(() => {
    const id = setInterval(() => {
      countDown.value--
      if (countDown.value === 0) {
        clearInterval(id)
        ctr.authModal.isOpen = true
        ctr.authModal.type = "SIGN_IN"
        nav(`/account/sign-in/`)
      }
    }, 1000)
  })

  return (
    <>
      <ResetPasswordShell>
        {/* Modal Message */}
        <div class={`p-tb-10 text-center`}>
          <div class={`p-b-5`}>
            <IconHappy size={30} fill={`var(--dual-dark)`} />
            <IconHappy size={30} fill={`var(--dual-dark)`} />
            <IconHappy size={30} fill={`var(--dual-dark)`} />
          </div>

          <h1 class={`font-size-14 color-theme-sub weight-800 p-b-5`}>Password is updated!</h1>

          <div class={`font-size-12`}>
            {`We will redirect you to the `}
            <Link href={`/account/sign-in/`}>sign-in page</Link>
            {` in `}
            <span class={`weight-800 color-theme-sub`}>{countDown.value}</span>
            {` seconds.`}
          </div>
        </div>
      </ResetPasswordShell>
    </>
  )
})
