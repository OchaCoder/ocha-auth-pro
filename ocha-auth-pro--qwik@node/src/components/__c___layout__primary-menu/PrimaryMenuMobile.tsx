import { component$ } from "@builder.io/qwik"
import { Logo } from "./internal/c-logo"
import { CloseMobileMenuButton } from "./internal/c-mobile-menu-button"
import { DarkModeButton } from "./internal/c-dark-mode-button"
import { PrimaryMenuItems } from "./internal/c-menu-items"

export const PrimaryMenuMobile = component$(({ height }: { height: string }) => {
  const utilClasses = `
                rspsv--visibility--visible--hidden rspsv--opacity--1--0 
                relative flex justify-between items-center 
                p-rl-7 shadow-medium-light-top 
                primary-menu-mobile
                `

  return (
    <>
      {/*  Primary menu [Mobile] */}
      <div class={utilClasses} style={{ height: height }}>
        <CloseMobileMenuButton />
        <Logo />
        <DarkModeButton />
      </div>
      {/* Primary menu [Mobile] items + footer. `visibility:hidden` & `opacity:0` if `isMenuOpen===true` */}
      <PrimaryMenuItems isMobile={true} />
    </>
  )
})
