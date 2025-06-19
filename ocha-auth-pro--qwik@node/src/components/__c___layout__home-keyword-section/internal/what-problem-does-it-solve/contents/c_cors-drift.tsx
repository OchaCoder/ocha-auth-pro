import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const CorsDrift = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.CORS_DRIFT ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>CORS Drift</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            When frontend and backend are hosted on different domains, you typically need to configure <span class={`weight-800`}>CORS (Cross-Origin Resource Sharing)</span> to allow your frontend to
            talk to your backend.
          </p>
          <p>
            CORS misconfigurations is surprisingly common—creating unexpected security holes, or causing inconsistent behavior between browsers, especially as an app evolves or environments change.
          </p>
          <p>Over time, it's easy for CORS rules to become too loose or inconsistent—accidentally allowing origins that shouldn’t be trusted.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>No CORS, No Problem</h2>
          <p>
            OchaAuthPro avoids this entire category of issues by <span class={`weight-800`}>performing all fetch operations server-side</span>, through Qwik’s <code class={`code`}>routeLoader$</code>,{" "}
            <code class={`code`}>routeAction$</code>, and <code class={`code`}>server$</code>.
          </p>
          <p>
            This means every request to Fastify is made from the server—not the browser—so CORS simply <span class={`weight-800`}>doesn’t apply</span>.
          </p>

          <p>By skipping CORS entirely, we remove a whole class of bugs and simplify deployment, while keeping everything safer by design.</p>
        </section>
      </div>
    </>
  )
})
