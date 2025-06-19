import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const WebsocketVsSse = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column justify-start
              p-10
              ${code === modalKeywordCode.architectureAndTools.WEBSOCKET_VS_SSE ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>WebSocket (vs SSE)</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            OchaAuthPro originally implemented real-time infrastructure monitoring using <code class={`code`}>Server-Sent Events (SSE)</code>. It worked well locally, providing periodic updates about
            Postgres and Redis health through a lightweight one-way connection.
          </p>
          <p>But once deployed, the health modal began flashing red and green exactly every five minutes—something that never happened during development.</p>
          <p>
            The browser console revealed recurring <code class={`code`}>ERR_HTTP2_PROTOCOL_ERROR</code> and <code class={`code`}>ERR_NETWORK_IO_SUSPENDED</code> messages.
          </p>
          <p>
            The issue was that SSE didn’t play well with HTTP2 on Railway. Rather than downgrading the entire app to HTTP1 just to accommodate SSE, I refactored the system to use{" "}
            <span class={`color-theme-sub weight-800`}>WebSocket</span>.
          </p>
          <p>
            With WebSocket, the setup became simpler and more robust. The client immediately detects when Fastify goes down via the <code class={`code`}>onclose</code> event. This triggers a
            reconnection loop with exponential backoff and jitter until the server becomes available again.
          </p>
          <p>
            While SSE was initially appealing due to its low overhead, WebSocket ultimately offered more reliability and flexibility—especially since it supports multiple channels over a single
            connection. This allows OchaAuthPro to manage real-time infrastructure updates cleanly and efficiently.
          </p>
          <p>
            On the homepage, you’ll still see “Fastify’s last known heartbeat:” displayed every five seconds. This heartbeat is now updated via WebSocket, not SSE—but it remains as a small tribute to
            the system that came before.
          </p>
        </section>
      </div>
    </>
  )
})
