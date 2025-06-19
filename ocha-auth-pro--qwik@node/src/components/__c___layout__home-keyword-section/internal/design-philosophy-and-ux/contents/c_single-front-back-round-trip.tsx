import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const SingleFrontBackRoundTrip = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.SINGLE_FRONT_BACK_ROUND_TRIP ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Single Front–Back Round Trip</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>OchaAuthPro avoids the classic two-step token refresh flow that many apps use: one fetch to refresh the access token, followed by another fetch to access the protected resource.</p>

          <p>Instead, we do both in one seamless round trip—thanks to a dedicated backend route that acts as both proxy and adapter.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>The flow</h2>
          <p>
            When a user tries to fetch a protected resource but only has a valid <code class="code">bid</code> (browser ID, which points to a refresh token stored in Redis), the frontend sends that{" "}
            <code class="code">bid</code>, along with the target path and payload, to a special route:
            <br />
            <code class="code">/user/regular/action/proxy-refresh-at</code>
          </p>

          <p>This backend route:</p>
          <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <ul class={`p-10 flex flex-column gap-15`}>
              <li>Authenticates the user by verifying the refresh token from Redis</li>
              <li>Generates and signs new access/refresh tokens</li>
              <li>Injects a backend request to the intended route using the new access token</li>
              <li>Forwards the final response back to the frontend in a unified shape</li>
            </ul>
          </div>

          <p>By bundling token refresh and content access into one round trip, we reduce latency, simplify client logic, and avoid UX quirks caused by mid-request token changes.</p>
        </section>
      </div>
    </>
  )
})
