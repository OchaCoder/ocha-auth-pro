import { component$, useSignal, useTask$ } from "@builder.io/qwik"
import type { Ctr } from "~/___ctx___/internal/type-ctr"
import type { ModalCode } from "~/components/__c__modal__auth/modal-control"
import { modalControl } from "~/components/__c__modal__auth/modal-control"

export const ButtonStartAuth = component$(({ ctr, type, locBeforeModal }: { ctr: Ctr; type: ModalCode; locBeforeModal: string }) => {
  const title = useSignal("")

  const modalTitleMap = {
    SIGN_UP: "Sign Up" as const,
    SIGN_IN: "Sign In" as const,
    RESET_PASSWORD: "Reset Password" as const,
  }

  useTask$(() => {
    title.value = modalTitleMap[type]
  })

  return (
    <>
      {/* ⚠️ `z-1` for floating fx over the shadow of the cards */}
      <div
        class={`z-1 button hover-button bg-theme-sub color-dual-light hover-bg-theme-sub font-size-11 weight-800`}
        style={{ height: "24px", width: "100px" }}
        onClick$={() => {
          modalControl.open[type](ctr, locBeforeModal)
        }}>
        {title.value}
      </div>
    </>
  )
})
