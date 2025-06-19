import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const Fastify = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
        flex-column justify-start
        p-10
        ${code === modalKeywordCode.architectureAndTools.FASTIFY ? `flex visible opacity-1` : `none hidden opacity-0`}
        `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Fastify</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            OchaAuthPro uses <span class={`color-theme-sub weight-800`}>Fastify</span> as the backend framework, chosen for its balance between speed, developer experience, and community maturity.
          </p>
          <p>
            While frameworks like Elysia or Hono offer excellent performance benchmarks, Fastify provides a more established ecosystem and familiar patterns—especially for developers coming from
            Express.
          </p>
          <p>For a showcase project that includes real-world concerns like cookie handling, plugin management, and extensibility, Fastify serves as a modern but pragmatic choice.</p>
          <p>Its support for decorators, schema-based validation, and easy plugin architecture made it a natural fit for building secure, modular features quickly.</p>
        </section>
      </div>
    </>
  )
})
