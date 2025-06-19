import { component$, useContext } from "@builder.io/qwik"
import { closeMobileMenu } from "./f-close-mobile-menu"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { MobileMenuFooter } from "./c-mobile-menu-footer"

export const PrimaryMenuItems = component$(({ isMobile }: { isMobile: boolean }) => {
  const { ctr } = useContext(ContextIdGlobalState)

  const utilClasses = {
    item: `
          rspsv--pad--tb5--tb0 
          p-rl-7 
          italic color-dual-dark hover-color-theme 
          no-underline cursor-pointer transition-color
          `,

    itemsWrap: {
      desktop: `flex grow items-center justify-end`,
      mobile: `${ctr.mobileMenu.isOpen ? `rspsv--opacity--1--0 rspsv--visibility--visible--hidden` : `opacity-0 hidden`} 
                z-5 fixed w-100 vh-100 
                p-tb-9 bg-dual-light gracefully-vanish`,
    },
  }

  return (
    <>
      <div class={isMobile ? utilClasses.itemsWrap.mobile : utilClasses.itemsWrap.desktop} onClick$={() => closeMobileMenu(ctr)}>
        {/* <div class={`${utilClasses.item} rspsv--border--bottom--right`} onClick$={() => navigateAndCloseMenu("/page-a/")}>
          Page A
        </div> */}

        {isMobile && <MobileMenuFooter />}
      </div>
    </>
  )
})
