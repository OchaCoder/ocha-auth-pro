import { component$ } from "@builder.io/qwik"
import { useLocation } from "@builder.io/qwik-city"
import { Home } from "~/components/__c___layout__home"
import { IconSad } from "~/components/__c_utils__svg"

export default component$(() => {
  const loc = useLocation()

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
            <h2 class={`color-theme-sub weight-800 font-size-14`}>404</h2>
            <p>Sorry, we couldn't find that page!</p>
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
