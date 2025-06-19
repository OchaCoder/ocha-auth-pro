import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const TokenTheftTokenForgery = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.TOKEN_THEFT ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
      <section class={`flex flex-column gap-15 p-tb-10`}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Token Theft / Forgery</h1>

        <p>OchaAuthPro defends against token theft and forgery using multiple layered protections:</p>

        <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
          <ul class={`p-10 flex flex-column gap-15`}>
            <li>
              <p>
                <span class={`weight-800`}>Refresh tokens (RT)</span> are never exposed to the client—not even in cookies. They live entirely in Redis, referenced via a browser ID (
                <code class={`code`}>bid</code>), and rotated safely on the server.
              </p>
            </li>
            <li>
              <p>
                <span class={`weight-800`}>Access tokens (AT)</span> are stored in cookies with <code class={`code`}>HttpOnly</code>, <code class={`code`}>Secure</code>, and {` `}
                <code class={`code`}>SameSite=Strict</code>. And they’re short-lived—<span class={`weight-800`}>just 60 seconds</span>. Even if stolen, they’ll likely expire before they can be abused.
              </p>
            </li>
            <li>
              <p>
                <span class={`weight-800`}>Backend access</span> is guarded by a custom header—simple, but it prevents casual recon and mass requests.
              </p>
            </li>
            <li>
              <p>
                <span class={`weight-800`}>All tokens</span> are signed using <code class={`code`}>Paseto v4</code>—not JWT. They’re <span class={`italic`}>non-decodable</span> without the secret key.
              </p>
            </li>
          </ul>
        </div>

        <p>Together, these choices don’t just “check boxes”—they make forgery and replay attempts extremely difficult.</p>
        <p>Even if an attacker grabs something, they’d still need perfect timing, exact routing, and cryptographic skill to do anything meaningful.</p>
      </section>
    </div>
  )
})
