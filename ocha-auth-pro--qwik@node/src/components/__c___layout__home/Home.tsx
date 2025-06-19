import { component$, useContext, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../___ctx___/context-global-state"
import { HomeKeywordSection } from "../__c___layout__home-keyword-section/HomeKeywordSection"
import style from "./internal/style.css?inline"

export const Home = component$(() => {
  const { system } = useContext(ContextIdGlobalState)
  useStylesScoped$(style)
  const animationClass = useSignal()

  useTask$(({ track }) => {
    track(() => system.health.display.lastHeartbeat)
    animationClass.value = true
    setTimeout(() => {
      animationClass.value = false
    }, 1000)
  })

  return (
    <>
      <div class={`flex justify-center`}>
        <div class={`max-w-1080 flex flex-column w-100 p-rl-4`}>
          <div>
            <div>Fastify's last known heartbeat : </div>
            <div class={`relative overflow-hidden bg-dual-dark flex items-center`} style={{ height: "18px", width: "200px" }}>
              <div class={`flex justify-center w-100 absolute bg-dual-dark color-dual-light ${animationClass.value && "slot"}`}>{system.health.display.lastHeartbeat}</div>
            </div>
          </div>

          <h2 class={`h2 font-size-20`}>An Intentionally Overbuilt Authentication System</h2>
          <div class={`flex flex-column gap-10 p-10`}>
            <p class={`font-size-14`}>
              <span class="font-size-14 weight-800 color-gray">Supercharged by:</span>
            </p>
            <p class={`p-rl-10 font-size-14`}>Qwik • Fastify • PostgreSQL • Redis • Typebox • WebSocket • Prometheus • Grafana • Paseto V4 • Argon2 • Wretch • Secure Cookie Practice</p>
          </div>

          <HomeKeywordSection />
        </div>
      </div>
    </>
  )
})
