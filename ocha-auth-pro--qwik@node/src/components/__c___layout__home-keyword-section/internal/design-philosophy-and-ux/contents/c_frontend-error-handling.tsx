import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const FrontendErrorHandling = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.designPhilosophyAndUx.FRONTEND_ERROR_HANDLING ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Frontend Error Handling</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            In OchaAuthPro, all fetch operations are done on the server—either inside a <code class="code">routeAction$</code>, <code class="code">routeLoader$</code>, or{" "}
            <code class="code">server$</code>. This means we can handle all fetch-related errors server-side, before they reach the client.
          </p>

          <p>
            Errors from the backend are intercepted via a centralized <code class="code">wretchErrorHandler()</code> inside the <code class="code">.catch()</code> block of Wretch. The handler
            categorizes the error based on backend response codes and performs one of the following:
          </p>

          <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <ul class={`p-10 flex flex-column gap-15`}>
              <li>
                Returns a structured object with a <code class="code">success: false</code> flag and toast-friendly message.
              </li>
              <li>
                Performs a server-side redirect using <code class="code">ev.redirect(...)</code> to pages like <code class="code">/oops</code> or <code class="code">/hmm</code>.
              </li>
            </ul>
          </div>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Why only server-side?</h2>
          <p>Since fetches never happen on the browser directly, this design avoids CORS issues, improves performance, and allows us to take full advantage of real server-side redirects.</p>
          <p>It also improves SEO and loading behavior—there are no flickers, and no "pretend" redirects via JavaScript. The user lands directly where they should.</p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Handling Toast vs Redirect</h2>
          <p>Errors that are considered part of the normal user experience (e.g. incorrect password, expired reset link) are returned with structured objects and used to trigger toast messages.</p>
          <p>
            More serious or unexpected errors (e.g. suspicious activity, unknown error) result in server-side redirects to appropriate error routes, such as <code class="code">/hmm</code> or{" "}
            <code class="code">/oops</code>.
          </p>
        </section>
      </div>
    </>
  )
})
