import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const EmailEnumeratioinBruteForce = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.EMAIL_ENUMARATION_BRUTE_FORCE ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Email Enumeration Brute Force</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            Some websites tell you whether an email is registered <span class={`weight-800`}>as you type</span>—usually to help you sign in with the right one.
          </p>
          <p>But this can be abused: attackers can cycle through thousands of addresses to identify which ones are valid accounts.</p>
          <p>
            This is called <span class={`weight-800`}>email enumeration</span>, and it’s a real-world risk.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>OchaAuthPro’s Approach</h2>
          <p>
            We intentionally <span class={`weight-800`}>don’t contact the backend</span> until the user explicitly submits the form.
          </p>
          <p>During typing, we perform client-side format checks only—no calls to check if the email exists.</p>
          <p>This keeps our backend protected from silent brute force attempts targeting the email database.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Design Still Feels Friendly</h2>
          <p>When a login or reset attempt fails, we never erase the email input. The user can easily double-check their entry or try another.</p>
          <p>It’s a small touch, but it helps users stay oriented—without opening the door to abuse.</p>
        </section>
      </div>
    </>
  )
})
