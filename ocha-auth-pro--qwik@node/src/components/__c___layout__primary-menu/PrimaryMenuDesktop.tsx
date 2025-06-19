import { component$ } from "@builder.io/qwik"
import { PrimaryMenuItems } from "./internal/c-menu-items"
import { Logo } from "./internal/c-logo"
import { DarkModeButton } from "./internal/c-dark-mode-button"

export const PrimaryMenuDesktop = component$(({ height }: { height: string }) => {
  const utilClasses = `
                    rspsv--visibility--hidden--visible rspsv--opacity--0--1 rspsv--position--fixed--absolute 
                    flex justify-between items-center 
                    p-rl-7 shadow-medium-light-top bg-dual-light w-100 
                    transition-opacity
                  `
  return (
    <>
      {/*  Primary Menu [Desktop] */}
      <div class={utilClasses} style={{ height: height }}>
        <Logo />

        <div class={`flex`} style={{ gap: "10px" }}>
          <PrimaryMenuItems isMobile={false} />

          <DarkModeButton />
        </div>
      </div>
    </>
  )
})
