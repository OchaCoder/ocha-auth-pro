import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const SamesiteStrictForEverything = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.SAMESITE_STRICT_FOR_EVERYTHING ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>SameSite=Strict for Everything</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            In OchaAuthPro, all production cookies—whether for session, identity, or protection—are set with <code class="code">SameSite=Strict</code>, <code class="code">Secure</code>, and{" "}
            <code class="code">HttpOnly</code>.
          </p>
          <p>This decision is rooted in one principle: if we can do something server-side, we do.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Why SameSite=Strict?</h2>
          <p>
            Using <code class="code">SameSite=Strict</code> prevents cookies from being sent on cross-origin requests—even when following links from other sites. This offers strong CSRF protection and
            ensures that cookies only travel when the user is intentionally navigating within the same site.
          </p>
          <p>While it might feel overly strict for some flows, in practice it’s a powerful guardrail—and for OchaAuthPro, it hasn’t gotten in the way of any real UX.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Exceptions for Controlled Cases</h2>
          <p>
            The only time we break this pattern is for temporary client-set cookies used for protected route access—like <code class="code">permit=yes</code> during internal transitions.
          </p>
          <p>
            These cookies can’t be <code class="code">HttpOnly</code> (since they’re set in JS), but we still apply <code class="code">SameSite=Strict</code> and <code class="code">Secure</code>, and
            we delete them immediately after the server-side gatecheck.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>A Clean Default</h2>
          <p>
            Locking down cookies this way makes your whole system easier to reason about. There’s no ambiguity over where or how cookies are accessed, and accidental leaks across origins are
            effectively blocked.
          </p>
        </section>
      </div>
    </>
  )
})
