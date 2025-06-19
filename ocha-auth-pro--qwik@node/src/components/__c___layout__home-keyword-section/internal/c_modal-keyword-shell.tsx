import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "./modal-keyword-code"

export const ModalKeywordShell = component$(({ code }: { code: ModalKeywordCode | null }) => {
  useStylesScoped$(`
    .scoped{
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 100%;
            max-height: 620px;
            min-width: 360px;
            width:90%;
            max-width: 800px;
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
              ${code !== null ? `visible opacity-1` : `hidden opacity-0 pointer-events-none`}
              gracefully-vanish scoped
              `

  return (
    <>
      <div class={classes}>
        <div class={`flex flex-column justify-start grow bg-dual-light relative`} style={{ minHeight: "610px", padding: "0px 10px" }}>
          <Slot />
        </div>
      </div>
    </>
  )
})
