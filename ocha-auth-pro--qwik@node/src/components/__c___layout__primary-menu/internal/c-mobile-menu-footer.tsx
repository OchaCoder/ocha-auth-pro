import { component$, useContext } from "@builder.io/qwik"
import { closeMobileMenu } from "./f-close-mobile-menu"
import { useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"

export const MobileMenuFooter = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  return (
    <>
      <div class={`flex justify-center italics font-size-11 p-tb-9`}>
        Copyright &copy; {new Date().getFullYear()}&nbsp;
        <div
          class={`hover-color-theme cursor-pointer transition-color`}
          onClick$={() => {
            closeMobileMenu(ctr)
            nav("ochacoder.com")
          }}>
          OchaCoder.com
        </div>
      </div>
    </>
  )
})
