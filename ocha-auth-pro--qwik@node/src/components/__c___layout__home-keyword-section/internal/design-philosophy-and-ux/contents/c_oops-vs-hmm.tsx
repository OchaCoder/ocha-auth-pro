import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const OopsVsHmm = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.OOPS_VS_HMM ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Oops vs Hmm</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            OchaAuthPro uses two fallback pages—<code class="code">/oops</code> and <code class="code">/hmm</code>—to gently classify unexpected errors into two distinct categories:
          </p>

          <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <ul class={`p-10 flex flex-column gap-15`}>
              <li>
                <strong>/oops</strong>: Indicates a backend failure or an internal bug—something went wrong on our side.
              </li>
              <li>
                <strong>/hmm</strong>: Indicates suspicious behavior that may point to tampering, forgery, or unexpected access patterns.
              </li>
            </ul>
          </div>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            While these pages are currently just styled routes with simple messages, they also act as mental boundaries. By distinguishing between user-originated issues and internal errors, we lay
            the groundwork for smarter future behaviors.
          </p>

          <p>
            For example, the <code class="code">/hmm</code> page could eventually collect anonymous browser or behavior data and report it back to Fastify, helping to inform alerting systems or even
            enable dynamic blacklisting.
          </p>
        </section>
      </div>
    </>
  )
})
