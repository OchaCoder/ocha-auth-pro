import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const BackendAccessViaCurl = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column items-start
            p-10
            ${code === modalKeywordCode.whatProblemDoesItSolve.BACKEND_ACCESS_VIA_CURL ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Backend Access via curl or Postman</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>In a production environment, it’s common to deploy the frontend and backend separately for scalability.</p>
          <p>
            But this separation introduces a security concern: <strong>anyone could try to access backend routes directly</strong> using tools like <code class={`code`}>curl</code>, Postman, or a
            custom bot.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>If problem doesn't exist, no solution is needed</h2>

          <p>
            If the backend and frontend are deployed together (e.g. on the same server or internal network), this problem doesn’t exist—Fastify can simply accept requests from{` `}
            <code class={`code`}>localhost</code> only.
          </p>
          <p>
            And if possible, <span class={`weight-800`}>that’s what I recommend.</span>
          </p>
          <p>
            But I try to <span class={`italic`}>provide</span> a solution regardless—something useful even for those who can't deploy frontend and backend together.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Custom Header</h2>
          <p> Each request from Qwik includes a custom HTTP header like: </p>
          <p>
            <code class={`code`}>{`headers: { gatekeeper: "3bQdY1mE3agwuYqelMyjoS3GDaTY6iTtpxmg" }`}</code>
          </p>
          <p>
            On the Fastify side, I use a lightweight custom plugin <code class={`code`}>headerCheckerPlugin</code> that inspects this header on every request, and{" "}
            <span class={`weight-800`}>instantly blocks suspicious access attempts</span> that don't include a valid token.
          </p>
        </section>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 font-size-14`}>Baby Version, But Room to Grow</h2>
          <p> Right now, I use a static token for simplicity—but the structure is already in place for more advanced setups: </p>
          <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <ul class={`p-10 flex flex-column gap-15`}>
              <li>Rotating tokens periodically via Redis or database</li> <li>Pre-defined static token cycles (deterministic rotation)</li>{" "}
              <li>Pairing header checks with IP-based rate limiting or blacklist tables</li>
            </ul>
          </div>

          <p> I’d love to explore these ideas to enhance the protection—even without introducing external dependencies unless necessary. </p>
        </section>
      </div>
    </>
  )
})
