import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const LeakyClientCode = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.LEAKY_CLIENT_CODE ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
      <section class={`flex flex-column gap-15 p-tb-10`}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Leaky Client Code</h1>

        <p>A common cause of vulnerabilities in web apps is letting too much happen on the client. Every extra line of exposed logic can become a possible attack surface.</p>

        <p>
          <span class={`weight-800`}>OchaAuthPro minimizes client-side exposure</span> by pushing all sensitive logic to the server whenever possible. Qwik’s architecture makes this not only feasible,
          but elegant.
        </p>

        <p>We make deliberate use of Qwik’s server-capable primitives</p>
        <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
          <ul class={`p-10 flex flex-column gap-15`}>
            <li>
              <code class={`code`}>onRequest</code>
            </li>
            <li>
              <code class={`code`}>routeLoader$</code>, <code class={`code`}>routeAction$</code>, <code class={`code`}>globalAction$</code>
            </li>
            <li>
              <code class={`code`}>server$</code>
            </li>

            <li>
              <code class={`code`}>useTask$</code> (initial run only)
            </li>
          </ul>
        </div>

        <p>This approach helps us reduce the attack surface, harden the logic behind secure routes, and make the app feel faster—all at the same time.</p>
      </section>
    </div>
  )
})
