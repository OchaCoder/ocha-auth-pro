import { component$, useContext } from "@builder.io/qwik"
import { useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { closeMobileMenu } from "./f-close-mobile-menu"

/**
 * The logo section shared by both the desktop and mobile versions of the dual primary menu.
 * In the desktop version, `resetMobileMenu` is used as a defensive safeguard.
 */
export const Logo = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  return (
    <div class={`flex items-center color-dual-dark cursor-pointer`} style={{ fontSize: "18px" }}>
      <div
        class={`no-underline`}
        onClick$={() => {
          closeMobileMenu(ctr)
          nav("/")
        }}>
        OchaCoder.com
      </div>
    </div>
  )
})
