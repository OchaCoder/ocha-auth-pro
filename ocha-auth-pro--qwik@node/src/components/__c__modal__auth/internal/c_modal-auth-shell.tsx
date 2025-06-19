import { component$, Slot, useContext, useStylesScoped$ } from "@builder.io/qwik"
import { ModalAuthCloseButton } from "./c_modal-auth-close-button"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"

export const ModalAuthShell = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)
  useStylesScoped$(`
    .scoped{
    
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 100%;
            max-height: 620px;
            min-width: 360px;
            width:90%;
            max-width: 440px;
            border-radius: 20px;
            overflow: auto;
            border:5px solid var(--theme);
    }
    .scoped::-webkit-scrollbar {
            width: 14px;
    }

    .scoped::-webkit-scrollbar-thumb {
            background-color: rgba(155, 153, 155, 0.8);
            border-radius: 10px;
    }   
 `)

  const classes = `
            z-3 fixed 
            ${ctr.authModal.isOpen ? `visible opacity-1` : `hidden opacity-0 pointer-events-none`} 
            gracefully-vanish scoped
            `

  return (
    <>
      <div class={classes}>
        <div class={`flex flex-column justify-center grow bg-dual-light`} style={{ height: "610px", padding: "0px 10px" }}>
          <ModalAuthCloseButton />

          <Slot />
        </div>
      </div>
    </>
  )
})
