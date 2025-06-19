import { $, component$, useOnWindow } from "@builder.io/qwik"
import { useLocation, useNavigate } from "@builder.io/qwik-city"
import { Home } from "~/components/__c___layout__home"
import { IconSad } from "~/components/__c_utils__svg"

export default component$(() => {
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
      <>
        {loc.prevUrl !== undefined ? (
          <div class={`flex flex-column items-center justify-center gap-10 p-tb-10`} style={{ height: `300px` }}>
            <div class={`flex`}>
              <IconSad fill={`var(--dual-dark)`} />
              <IconSad fill={`var(--dual-dark)`} />
              <IconSad fill={`var(--dual-dark)`} />
            </div>
            <h2 class={`color-theme-sub weight-800 font-size-14`}>Hmm...</h2>
            <p>We couldn't process your request this time.</p>
            <p>Please retry again in a moment.</p>
          </div>
        ) : (
          <>
            <Home />
          </>
        )}
      </>
    </>
  )
})
