import { $, component$, useContext, useOnWindow } from "@builder.io/qwik"
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { Home } from "~/components/__c___layout__home"
import { modalControl } from "~/components/__c__modal__auth"
import { IconSad } from "~/components/__c_utils__svg"

export default component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)
  const loc = useLocation()
  const nav = useNavigate()

  useOnWindow(
    "load",
    $(() => {
      nav(`/`)
    })
  )

  return (
    <>
      {loc.prevUrl !== undefined ? (
        <div class={`flex flex-column items-center justify-center gap-10 p-tb-10`} style={{ height: `300px` }}>
          <div class={`flex`}>
            <IconSad fill={`var(--dual-dark)`} />
            <IconSad fill={`var(--dual-dark)`} />
            <IconSad fill={`var(--dual-dark)`} />
          </div>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Your sesssion has expired.</h2>
          <p>
            {`Please sign-in from `}
            <Link
              href={`/account/sign-in/`}
              class={`color-theme-sub`}
              onClick$={() => {
                ctr.authModal.isOpen = true
                ctr.authModal.type = modalControl.code.SIGN_IN
              }}>
              here
            </Link>
            {`.`}
          </p>
        </div>
      ) : (
        <>
          <Home />
        </>
      )}
    </>
  )
})
