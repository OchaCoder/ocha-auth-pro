import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const TokenDesyncAcrossTabs = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.TOKEN_DESYNC_ACROSS_TABS ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Token Desync Across Tabs</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            A common issue in authentication systems is <span class={`weight-800`}>token desynchronization</span>—when you rotate your refresh token (RT) in one tab, but other tabs still carry the old
            version.
          </p>
          <p>This causes weird behavior like getting logged out in other tabs, or even triggering silent security errors that confuse the user.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>OchaAuthPro’s Solution</h2>
          <p>
            We solved this by keeping the <code class={`code`}>bid</code> cookie—the browser ID—<span class={`weight-800`}>unchanged during token rotation</span>.
          </p>
          <p>
            Only its <code class={`code`}>maxAge</code> is updated to reflect the new refresh token’s lifetime.
          </p>
          <p>
            Since every tab shares the same <code class={`code`}>bid</code>, they continue to function correctly even after the RT gets refreshed elsewhere.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>One Cookie, Shared State</h2>

          <p>
            When a refresh token is rotated, we don’t change the <code class={`code`}>bid</code> value. Instead, we just update its <code class={`code`}>maxAge</code>.
          </p>

          <p>
            This subtle decision matters:{" "}
            <span class={`weight-800`}>
              updating only <code class={`code`}>maxAge</code> applies across all tabs
            </span>
            , while replacing the entire cookie applies to the current tab only.
          </p>

          <p>
            By preserving the cookie value but extending its lifetime, we achieve <span class={`weight-800`}>session consistency across all browser tabs</span>, without ever exposing the actual
            refresh token.
          </p>

          <p>
            <code class={`code`}>bid</code> is just a lookup key for the real RT in Redis — the client never sees the token itself.
          </p>
        </section>
      </div>
    </>
  )
})
