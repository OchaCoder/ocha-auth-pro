import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Postgresql = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
            flex-column justify-start
            p-10
            ${code === modalKeywordCode.architectureAndTools.POSTGRESQL ? `flex visible opacity-1` : `none hidden opacity-0`}
            `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>PostgreSQL</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            OchaAuthPro uses <span class={`color-theme-sub weight-800`}>PostgreSQL</span> as its primary relational database.
          </p>
          <p>
            The decision didn’t require much debate—Postgres has earned its place in modern web development with decades of rock-solid engineering. It’s reliable, consistent, and still evolving in
            meaningful ways.
          </p>
          <p>
            From strong relational modeling to JSON support and advanced indexing, Postgres handles everything this app needs—and does so with confidence. Supabase, Neon, and many other platforms
            trust it as their core, and so do I.
          </p>
          <p>In many ways, Postgres is the quiet hero of the stack. It’s not flashy—but it’s foundational.</p>
        </section>
      </div>
    </>
  )
})
