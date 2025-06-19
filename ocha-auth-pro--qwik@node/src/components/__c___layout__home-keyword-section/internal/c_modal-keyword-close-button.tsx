import type { Signal } from "@builder.io/qwik"
import { component$ } from "@builder.io/qwik"
// import { modalControl } from "../modal-control"
import { IconClose } from "~/components/__c_utils__svg"

export const ModalKeywordCloseButton = component$(({ code }: { code: Signal }) => {
  return (
    <>
      <div
        class={`z-1 fixed cursor-pointer scoped`}
        style={{ top: "8px", right: "10px" }}
        onClick$={() => {
          code.value = null
        }}>
        <IconClose size={34} fill={"var(--theme-sub)"} />
      </div>
    </>
  )
})
