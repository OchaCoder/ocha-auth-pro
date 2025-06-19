import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { Home } from "~/components/__c___layout__home"
import { IconClose } from "~/components/__c_utils__svg"

export const ResetPasswordShell = component$(() => {
  useStylesScoped$(`
          .scoped{
              max-width: 600px;
              width: 95%;
              gap: 20px;
              border-radius: 12px;
              border: solid 5px var(--theme-sub);
              padding-top: 30px;
              padding-bottom: 40px;
          }
      `)
  const classes = `
      z-3 absolute grid justify-center 
      bg-dual-light gracefully-vanish p-rl-5
      scoped 
  `

  return (
    <>
      <div class={`fixed overflow-hidden`} style={{ left: 0, top: 0, right: 0, bottom: 0 }}>
        <Home />
      </div>
      {/* Overlay */}
      <Link href={`/`} class={`z-2 absolute cursor-auto`} style={{ left: 0, top: 0, right: 0, bottom: 0, backgroundColor: "#00000080", backdropFilter: "blur(8px)" }} />

      <div class={`absolute flex items-center justify-center`} style={{ left: 0, top: 0, right: 0, bottom: 0 }}>
        <div class={classes}>
          {/* Close Button */}
          <Link href={`/`} class={`absolute cursor-pointer`} style={{ top: `5px`, right: `5px` }}>
            <IconClose size={30} fill={`var(--theme-sub)`} />
          </Link>
          <Slot />
        </div>
      </div>
    </>
  )
})
