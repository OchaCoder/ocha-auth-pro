import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const BackendErrorHandling = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
          flex-column items-start
          p-10
          ${code === modalKeywordCode.designPhilosophyAndUx.BACKEND_ERROR_HANDLING ? `flex visible opacity-1` : `none hidden opacity-0`}
          `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Backend Error Handling</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            Fastify offers <code class={`code`}>fastify.setErrorHandler</code> to catch any errors that occur during the request–response lifecycle. OchaAuthPro uses this feature as part of a central
            error catcher plugin.
          </p>
          <p>There are also custom error classes that help classify errors based on their context.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>ErrorSuspiciousActivity</h2>
          <p>Used when a possible attack or tampering is detected—such as an unexpected token type or TTL mismatch.</p>
          <p>
            In this showcase, the error leads to a server-side redirect to the <code class={`code`}>'/hmm'</code> route. But in a more advanced setup, simply connecting this to Prometheus + Grafana
            could already serve as an instant surveillance system.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>ErrorDefensiveGuardBreach</h2>
          <p>
            This class is reserved for when something breaks internally that should never break. For instance, if a successfully decrypted Paseto token has an unexpected shape, it's more likely a bug
            during the signing stage than an attack.
          </p>
          <p>
            In this demo, it triggers a server-side redirect to <code class={`code`}>'/oops'</code>. But if clearer visibility or a stricter fail-fast policy is preferred, this class can also be used
            to intentionally crash the app.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>ErrorPostgres and ErrorRedis</h2>
          <p>
            I also created two internal error types for infrastructure-related failures. Both of them trigger the standard error code <code class={`code`}>ERR_SYSTEM_FAILURE</code>.
          </p>
          <p>If these systems go down, the frontend shows a soft “Connection unstable” modal and backs off from further requests.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Normal Errors</h2>
          <p>
            Most normal errors triggered within the expected scope of user actions are handled at the route level. For example, errors like <code class={`code`}>ERR_EMAIL_ALREADY_EXISTS</code> are
            handled locally in each route and sent directly to the frontend with the appropriate status code—without going through the central error handler.
          </p>
        </section>
      </div>
    </>
  )
})
