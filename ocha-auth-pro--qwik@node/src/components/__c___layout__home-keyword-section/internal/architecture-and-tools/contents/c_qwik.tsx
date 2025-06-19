import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Qwik = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column justify-start
              p-10
              ${code === modalKeywordCode.architectureAndTools.QWIK ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Qwik</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            When choosing a frontend framework for OchaAuthPro, performance was a priority—but so was understanding where and how my code was running. I explored Next.js, Astro, and Gatsby, but
            eventually chose <span class={`color-theme-sub weight-800`}>Qwik</span> for something deeper than just speed.
          </p>
          <p>
            Qwik's resumability model didn’t just help me optimize; it helped me think. Because Qwik keeps server and client logic side by side, it forced me to stay aware of execution context—where
            the code is, who can see it, and what phase the app is in.
          </p>
          <p>
            As a result, OchaAuthPro naturally leaned into security patterns like server-side redirects for suspicious access and <code class={`code`}>HttpOnly</code> cookies for nearly all session
            state.
          </p>
          <p>Adopting Qwik wasn’t always easy, but it was meaningful. The framework encouraged habits that made the app faster, safer, and more thoughtful from the ground up.</p>
        </section>
      </div>
    </>
  )
})
