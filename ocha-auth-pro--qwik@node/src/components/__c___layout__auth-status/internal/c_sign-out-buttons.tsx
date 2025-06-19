import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import { SignOutFromOne } from "./c_sign-out-from-one"
import { SignOutFromAll } from "./c_sign-out-from-all"
import style from "./style.css?inline"

export const SignOutButtons = component$(() => {
  const isOpen = useSignal(false)

  useStylesScoped$(style)

  const itemsShell = `
      ${isOpen.value ? `opacity-1 visible` : `opacity-0 hidden`}
      z-2
      absolute flex flex-column items-center justify-center  
      overflow-hidden 
      color-dual-light bg-dual-light
      gracefully-vanish shadow-medium-light-top
      scoped-items-shell
  `

  return (
    <>
      {/* Overlay */}
      {isOpen.value && <div class={`z-1 fixed`} style={{ left: 0, top: 0, right: 0, bottom: 0, opacity: 0.3 }} onClick$={() => (isOpen.value = !isOpen.value)}></div>}

      <div class={`relative flex justify-end`}>
        {/* Main button */}
        <div
          class={`z-2 absolute button bg-theme-sub hover-bg-theme-sub color-dual-light font-size-10`}
          onClick$={() => {
            isOpen.value = !isOpen.value
          }}>
          Sign out options
        </div>

        {/* Sign out option buttons */}
        <div class={itemsShell}>
          <div class={`flex flex-column w-100`}>
            <SignOutFromOne />

            <SignOutFromAll />
          </div>
        </div>
      </div>
    </>
  )
})
