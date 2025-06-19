import { component$ } from "@builder.io/qwik"
import { IconArrowRight } from "~/components/__c_utils__svg"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const PasetoOverJwt = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
          flex-column justify-start
          p-10
          ${code === modalKeywordCode.architectureAndTools.PASETO_OVER_JWT ? `flex visible opacity-1` : `none hidden opacity-0`}
          `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Paseto Over JWT</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            While JWT is widely used for authentication, OchaAuthPro uses <span class={`color-theme-sub weight-800`}>Paseto</span> instead—by design.
          </p>
          <p>Paseto (Platform-Agnostic Security Tokens) was created to fix the ambiguity and misuse-prone patterns that have plagued JWT for years.</p>
        </section>

        <section class={`p-tb-10`}>
          <div class={`flex flex-column gap-10 p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <div class={`p-5`}>
              <div class={`color-theme-sub`}>No "alg: none" problem</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Paseto has no header field that can be tampered with</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Secure by default</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>No need to pick algorithms—it uses modern crypto under the hood</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Simpler spec, easier audits</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>No header, no base64 confusion, no critical omissions</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Safer expiration logic</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Paseto encodes expiration *inside* the payload, not as metadata</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>V4 Public/Secret key modes</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Paseto V4 supports both local (symmetric) and public (asymmetric) encryption</span>
              </div>
            </div>
          </div>
        </section>

        <section class={`p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 p-tb-5`}>Real-world impact</h2>
          <p>Using Paseto eliminates entire classes of bugs and vulnerabilities that are easy to introduce with poorly configured JWT. It keeps your tokens simple, strong, and secure—by design.</p>
        </section>
      </div>
    </>
  )
})
