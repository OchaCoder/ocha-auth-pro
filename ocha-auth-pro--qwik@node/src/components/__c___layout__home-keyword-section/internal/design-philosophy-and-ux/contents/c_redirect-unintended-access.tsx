import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const RedirectUnintendedAccess = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.REDIRECT_UNINTENDED_ACCESS ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Redirect Unintended Access</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            Some routes in OchaAuthPro—like <code class="code">/sign-up-process/</code>—don’t offer meaningful content by themselves. They're only meant to be visited by users who were
            programmatically navigated there during specific flows (like sign-up or password reset).
          </p>
          <p>Anyone landing on them directly should be immediately redirected.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Why not just client-side?</h2>
          <p>
            While a client-side redirect works, it's not ideal. There's often a visible flicker—part of the route's content may render for a moment before redirection kicks in. This feels unpolished.
          </p>
          <p>
            Alternatives like rendering a blank or fallback component on the client add code complexity and clutter. What we really want is a **true server-side redirect** that happens before anything
            is rendered at all.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>How we did it</h2>
          <p>
            We use a short-lived cookie as a server-readable signal. When the user is supposed to continue to a protected utility route, we set a flag like <code class="code">permit=yes</code> via
            client-side JavaScript.
          </p>
          <p>
            This can't be <code class="code">HttpOnly</code>, of course, since it’s being set client-side. But we make it as safe as possible: <code class="code">Secure</code> and{" "}
            <code class="code">SameSite=Strict</code>.
          </p>
          <p>
            Then, inside the route's <code class="code">onRequest</code> handler, the cookie is evaluated server-side. If it's missing or invalid, we trigger a server-side redirect
            immediately—**before** the component is even considered for rendering.
          </p>
          <p>
            And once the check is done, we delete the cookie right there in <code class="code">onRequest</code>. This makes it very difficult for malicious JavaScript or misbehavior to tamper with the
            flow.
          </p>
        </section>
      </div>
    </>
  )
})
