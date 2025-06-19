import { $, component$, useContext, useOnWindow } from "@builder.io/qwik"
import { Home } from "~/components/__c___layout__home/Home"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { modalControl } from "~/components/__c__modal__auth/modal-control"

export default component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)

  // Show the modal immediately if the user
  // - came here via bookmark
  // - came here via external link
  // - reloaded the page
  useOnWindow(
    "load",
    $(() => {
      ctr.authModal.isOpen = true
      ctr.authModal.type = modalControl.code.RESET_PASSWORD
      ctr.authModal.locBeforeModal = "/"
    })
  )

  return (
    <>
      <Home />
    </>
  )
})
