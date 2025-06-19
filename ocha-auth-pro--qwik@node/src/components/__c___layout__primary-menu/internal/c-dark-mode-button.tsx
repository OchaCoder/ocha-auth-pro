import { $, component$, useContext } from "@builder.io/qwik"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { setCookieFromClient } from "~/___fn___/__f___utils-cookies/set-cookie-from-client"
import { IconDarkMode } from "~/components/__c_utils__svg/internal/icon-dark-mode"
import { IconLightMode } from "~/components/__c_utils__svg/internal/icon-light-mode"

export const DarkModeButton = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)
  return (
    <>
      <div
        class="flex cursor-pointer"
        onClick$={$(() => {
          ctr.isDarkMode = !ctr.isDarkMode

          setCookieFromClient("mode", `${ctr.isDarkMode ? "dark" : "light"}`, 60 * 60 * 24 * 365)

          document.documentElement.classList.toggle("dark", ctr.isDarkMode)
        })}>
        {ctr.isDarkMode ? <IconDarkMode fill={`var(--dual-dark)`} /> : <IconLightMode fill={`var(--dual-dark)`} />}
      </div>
    </>
  )
})
