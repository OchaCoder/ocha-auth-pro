import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Typebox = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column justify-start
              p-10
              ${code === modalKeywordCode.architectureAndTools.TYPEBOX ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>TypeBox</h1>

        <section class={`flex flex-column gap-15 p-tb-10`} style={{ paddingBottom: "40px" }}>
          <p>
            Although Qwik ships with <code class={`code`}>zod$</code> support for schema validation on the frontend, OchaAuthPro uses <span class={`color-theme-sub weight-800`}>TypeBox</span> more
            heavily—especially in the backend.
          </p>
          <p>
            One reason is that Fastify has native integration with TypeBox, thanks to its JSON Schema compatibility. You can define a schema once, and Fastify will handle both validation and
            auto-generation for OpenAPI (if implemented).
          </p>
          <p>
            Even though we didn’t strictly share schemas between the frontend (Qwik) and backend (Fastify), using TypeBox in both places gave us consistency and flexibility across validation logic.
          </p>
          <p>
            The real turning point came when Zod’s dev-time vs run-time mismatch started causing friction. In several places, we needed to validate an object at runtime but also use its type at dev
            time. With Zod, this often led to awkward casting or inference issues.
          </p>
          <p>
            TypeBox provided a clean and elegant answer: a schema that gives us both the static type <code>Static&lt;typeof schema&gt;</code> and a compiled runtime validator. The result is type-safe,
            predictable, and easier to trust across the app.
          </p>
        </section>
      </div>
    </>
  )
})
