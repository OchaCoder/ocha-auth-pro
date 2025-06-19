import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const HealthModalGreenAndRed = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.HEALTH_MODAL ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Health Modal (Green & Red)</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            OchaAuthPro includes a friendly infrastructure health monitor powered by WebSocket. If Fastify, PostgreSQL, or Redis becomes unreachable, a red modal appears to inform the user that the
            system is unstable.
          </p>
          <p>
            When recovery is detected, the red modal is immediately replaced with a green one—animated and styled to gently reassure the user. The green modal only appears *after* a red modal has been
            shown at least once. We never show it on initial load, even if the system is healthy.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Red Modal & Recovery Strategy</h2>
          <p>
            A WebSocket <code class="code">onclose</code> event detects when Fastify is down and immediately shows the red modal. From there, a reconnection loop begins with a{" "}
            <strong>custom ping strategy</strong> that includes:
          </p>

          <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <ul class={`p-10 flex flex-column gap-15`}>
              <li>Exponential backoff (up to 1 minute delay between attempts)</li>
              <li>Random jitter added to each delay (prevents thundering herd)</li>
              <li>
                Server-side fetch via <code class="code">server$</code> to test Fastify recovery
              </li>
            </ul>
          </div>

          <p>If the backend becomes reachable again, the WebSocket reconnects and the green modal is shown briefly before fading out.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Infra Signals</h2>
          <p>
            PostgreSQL and Redis health changes are reported via <code class="code">onmessage</code> events over the same WebSocket connection. This enables centralized reporting using only one
            socket, with each channel clearly labeled.
          </p>
          <p>Green/red modals reflect these changes in real time, helping users understand the system’s status without interrupting their flow.</p>
        </section>
      </div>
    </>
  )
})
