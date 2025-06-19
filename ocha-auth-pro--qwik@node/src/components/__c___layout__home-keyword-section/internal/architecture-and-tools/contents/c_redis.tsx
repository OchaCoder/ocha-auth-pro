import { component$ } from "@builder.io/qwik"
import { IconArrowRight } from "~/components/__c_utils__svg"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Redis = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column justify-start
              p-10
              ${code === modalKeywordCode.architectureAndTools.REDIS ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Redis</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            OchaAuthPro uses <span class={`color-theme-sub weight-800`}>Redis</span> to store refresh tokens (RTs) securely on the server side.
          </p>
          <p>This avoids storing RTs in the client—removing exposure from cookies or localStorage—and enables advanced session management.</p>
        </section>

        <section class={`p-tb-10`}>
          <div class={`flex flex-column gap-10 p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <div class={`p-5`}>
              <div class={`color-theme-sub`}>RT lives in Redis, not in the client</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Only a browser ID (bid) is stored in the cookie—never the actual refresh token</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Per-device session control</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Each bid is tracked in a Redis sorted set, enabling sign-out from one or all browsers</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Solves token desync across tabs</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>By rotating RTs in Redis, we avoid stale tokens across multiple tabs</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Fire-and-forget with Redis</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Redis ops run async for performance, with safety checks at auth-critical moments</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
})
