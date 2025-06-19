import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const NoCorsPolicy = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.NO_CORS_POLICY ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>No-CORS Policy</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            One of the core design decisions in OchaAuthPro was to avoid CORS entirely—not by configuring headers, but by making sure that <strong>all fetches happen server-side</strong>.
          </p>
          <p>
            Whether it’s accessing Fastify routes or checking infra status, every HTTP request is handled inside <code class="code">routeLoader$</code>, <code class="code">routeAction$</code>, or{" "}
            <code class="code">server$</code>. The browser never directly fetches from the backend. This removes the need for any CORS configuration in the first place.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Why This Matters</h2>
          <p>
            CORS can behave differently across browsers, may require complicated backend headers, and often leads to debugging nightmares—especially for beginners. By routing fetches through the
            server, we sidestep all of this.
          </p>
          <p>
            This not only simplifies architecture, but also makes request handling more secure and easier to test. You also gain access to cookies, headers, and secrets only available on the server.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Is This the New Norm?</h2>
          <p>
            More modern frameworks like Next.js and Remix are also shifting toward server-first architecture. Fetching from the server is no longer just a workaround—it’s becoming a best practice for
            many use cases.
          </p>
          <p>
            Of course, client-side fetches still make sense for many scenarios like pagination or dynamic UI refreshes. But for auth flows and protected routes, this server-first design brings clarity
            and confidence.
          </p>
        </section>
      </div>
    </>
  )
})
