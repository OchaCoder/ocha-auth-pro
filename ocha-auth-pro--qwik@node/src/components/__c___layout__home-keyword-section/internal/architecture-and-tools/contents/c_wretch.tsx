import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Wretch = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column justify-start
              p-10
              ${code === modalKeywordCode.architectureAndTools.WRETCH ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Wretch</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            While many projects default to <span class={`weight-800`}>Axios</span> for making HTTP requests, <span class={`color-theme-sub weight-800`}>Wretch</span> is significantly lighter—making it
            a perfect match for OchaAuthPro’s performance-first mindset.
          </p>
          <p>
            Its fluent API is also beautifully expressive. One of the best examples is our global error handler pattern, where <code class={`code`}>.catch()</code> is used instead of{" "}
            <code class={`code`}>try/catch</code> blocks. This makes our code easier to read while still respecting HTTP semantics.
          </p>
          <p>
            When the backend returns 4xx or 5xx responses, Wretch doesn’t consider them “success,” so those errors are caught and routed through a central handler. There, we map backend error codes
            into frontend responses—either as toast messages or full redirects.
          </p>
          <p>This unified approach to fetch logic helped us keep the UI logic focused and predictable. Wretch may not be the most mainstream choice, but it definitely earned its place here.</p>
        </section>
      </div>
    </>
  )
})
