import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Csrf = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.CSRF ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
      <section class={`flex flex-column gap-15 p-tb-10`}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>CSRF (Cross-Site Request Forgery)</h1>

        <p>CSRF is a classic web attack where a malicious site tries to trick the browser into sending an unwanted request to a trusted site—usually by abusing automatically-included cookies.</p>

        <p>
          <span class={`weight-800`}>OchaAuthPro avoids this entirely</span> by setting all sensitive cookies with <code class={`code`}>SameSite=Strict</code>. This setting ensures that cookies will{" "}
          <span class={`weight-800`}>never be included in cross-origin requests</span>—eliminating the attacker’s main tool.
        </p>

        <p>Additionally, since all of our requests are initiated from the server, we avoid many of the risky patterns associated with client-initiated POSTs.</p>

        <p>
          With <span class={`weight-800`}>SameSite=Strict + server-side fetch</span>, we stay cleanly out of the CSRF blast radius—without needing CSRF tokens or extra headers.
        </p>
      </section>
    </div>
  )
})
