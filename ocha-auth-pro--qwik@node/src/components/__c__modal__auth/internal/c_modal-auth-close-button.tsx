import { component$, useContext } from "@builder.io/qwik"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { modalControl } from "../modal-control"
import { IconClose } from "~/components/__c_utils__svg"

export const ModalAuthCloseButton = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)

  return (
    <>
      <div
        class={`z-1 fixed cursor-pointer scoped`}
        style={{ top: "8px", right: "10px" }}
        onClick$={() => {
          modalControl.close(ctr)
        }}>
        <IconClose size={34} fill={"var(--theme-sub)"} />
      </div>
    </>
  )
})
