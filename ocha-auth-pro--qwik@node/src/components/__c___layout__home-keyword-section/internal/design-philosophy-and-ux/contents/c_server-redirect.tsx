import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const ServerRedirect = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.SERVER_REDIRECT ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Server Redirect</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            Throughout OchaAuthPro, we prefer <strong>server-side redirects</strong>—not just for security and control, but to improve user flow, SEO, and eliminate unwanted rendering flickers.
          </p>
        </section>
      </div>
    </>
  )
})
