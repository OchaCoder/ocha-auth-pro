import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const SecureCookiePractices = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column justify-start
              p-10
              ${code === modalKeywordCode.architectureAndTools.SECURE_COOKIE_PRACTICES ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Secure Cookie Practices</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>In OchaAuthPro, cookies are treated as security-critical by default—even for things like theme preferences.</p>
          <p>
            We consistently set <code class={`code`}>HttpOnly</code>, <code class={`code`}>Secure</code>, and <code class={`code`}>SameSite=Strict</code> for nearly all cookies.
          </p>
          <p>This reduces the attack surface for token theft, cross-site misuse, and the accidental leakage of sensitive session signals into client-side JavaScript.</p>
        </section>

        <section class={`p-tb-10`}>
          <h2 class={`font-size-14 color-theme-sub weight-800 p-tb-10`}>One known exception (and why)</h2>
          <div class={`flex flex-column gap-15`}>
            <p>
              In some flows, the user is programmatically navigated to a utility route like <code>/reset-password-process/</code>, which shouldn’t be directly accessible by typing a URL or refreshing
              the page.
            </p>
            <p>To protect these routes from unexpected access, we set a short-lived gatekeeper cookie just before the transition.</p>
            <p>
              But because the redirect decision happens inside client-side code, we needed a controlled way to set this cookie on the client—while still maintaining a similar level of security to a
              server-set cookie.
            </p>
            <p>
              For this, we briefly set a cookie like <code>permit=yes</code> using client-side JavaScript (still with <code class={`code`}>Secure</code> and <code class={`code`}>SameSite=Strict</code>
              ). This cookie is immediately deleted on the next server request—once verified—making it practically unreachable by harmful scripts or extensions.
            </p>
          </div>
        </section>
      </div>
    </>
  )
})
