import { component$, isBrowser, useContext, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { modalControl } from "../modal-control"

export const ModalAuthOverlay = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)

  const utilClasses = `
    z-2 fixed inset-0 vh-100
    ${ctr.authModal.isOpen ? "opacity-1 visible" : "opacity-0 hidden"}
    gracefully-vanish 
  `

  // Hide or show the scrollbar.
  useTask$(({ track }) => {
    track(() => ctr.authModal.isOpen)

    if (isBrowser && ctr.authModal.isOpen) document.body.style.overflow = "hidden"
    else if (isBrowser && !ctr.authModal.isOpen) document.body.style.overflow = "visible"
  })

  return (
    <div
      class={utilClasses}
      style={{ backgroundColor: "#00000080", backdropFilter: "blur(8px)" }}
      onClick$={() => {
        modalControl.close(ctr)
      }}></div>
  )
})
