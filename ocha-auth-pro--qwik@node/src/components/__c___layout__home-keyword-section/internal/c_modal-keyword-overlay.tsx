import type { Signal } from "@builder.io/qwik"
import { component$, isBrowser, useTask$ } from "@builder.io/qwik"

export const ModalKeywordOverlay = component$(({ code }: { code: Signal }) => {
  const utilClasses = `
    z-2 fixed inset-0 vh-100
    ${code.value !== null ? "opacity-1 visible" : "opacity-0 hidden"}
    gracefully-vanish
  `

  // Hide or show the scrollbar.
  useTask$(({ track }) => {
    track(() => code)

    if (isBrowser && code.value !== null) document.body.style.overflow = "hidden"
    else if (isBrowser && code.value === null) document.body.style.overflow = "visible"
  })

  return (
    <div
      class={utilClasses}
      style={{ backgroundColor: "#00000080", backdropFilter: "blur(8px)" }}
      onClick$={() => {
        code.value = null
      }}></div>
  )
})
