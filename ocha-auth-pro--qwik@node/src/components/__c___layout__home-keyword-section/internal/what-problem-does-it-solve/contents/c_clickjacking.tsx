import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Clickjacking = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.CLICKJACKING ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Clickjacking</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>Clickjacking is a sneaky trick where a malicious site embeds your app inside an invisible iframe and tricks users into clicking buttons they can’t actually see.</p>
          <p>For example, a user thinks they’re clicking “Play” on a video—when in reality, they’re clicking “Delete my account” from your app, hidden underneath.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Defense via HTTP Header</h2>
          <p>
            To prevent this, <span class={`weight-800`}>OchaAuthPro sends the following HTTP header on every response:</span>
          </p>
          <p>
            <code class={`code`}>Content-Security-Policy: frame-ancestors 'none'</code>
          </p>
          <p>This tells the browser: “Never allow this site to be embedded in a frame or iframe, not even by itself.”</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Global Hook, Minimal Code</h2>
          <p>
            The header is applied using a global <code class={`code`}>onRequest</code> hook inside <code class={`code`}>server.ts</code>, so it covers{" "}
            <span class={`weight-800`}>all routes automatically</span>—even those added later.
          </p>
          <p>
            There’s no need to manually attach this header to every <code class={`code`}>reply.send()</code>. One line, full coverage.
          </p>
        </section>
      </div>
    </>
  )
})
