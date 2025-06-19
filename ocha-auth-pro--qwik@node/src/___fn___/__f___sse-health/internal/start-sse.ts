// import { System } from "~/___ctx___/internal/type-system"
// import { TbV } from "~/___typebox___/precompiled-validators"
// import { configPublic } from "~/config-public"
// import { startPingLoop } from "./start-ping-loop"
// import { heartbeatChecker } from "./heartbeat-checker"

// export const startSse = (system: System, evSource: EventSource | null) => {
//   // If SSE is already running, close it
//   if (evSource) {
//     evSource.close()
//     evSource = null
//   }

//   // Start the SSE.
//   evSource = new EventSource(`${configPublic.BACKEND_URL}/sse`)

//   // Start the heartbeat checker loop immedietely.
//   // The initial value of `system.health.lastHeartbeat` is `Date.now()`.
//   heartbeatChecker(system)

//   // Fastify is up.
//   evSource.onopen = (e) => {
//     system.health.isStable.fastify = true
//   }

//   // Fastify's heartbeat came back.
//   evSource.addEventListener("FASTIFY_HEARTBEAT", (ev: MessageEvent) => {
//     system.health.lastHeartbeat = Date.now()
//     const rawRes = JSON.parse(ev.data)
//     // Heartbeat payload is in expected shape.
//     if (TbV.health.sse.fastifyHeartbeat.Check(rawRes)) {
//       console.log("ev.data", rawRes, TbV.health.sse.fastifyHeartbeat.Check(rawRes))
//       system.health.display.lastHeartbeat = rawRes.data.time
//       // Heartbeat payload has unexpected shape.
//     } else {
//       system.health.isStable.fastify = false
//       system.health.showModal.red
//     }
//   })

//   // Infra health report came back.
//   evSource.addEventListener("INFRA_HEALTH", (ev: MessageEvent) => {
//     const rawRes = JSON.parse(ev.data)

//     // Infra health report is reliable.
//     if (TbV.health.sse.infraHealth.Check(rawRes)) {
//       // Infra is also stable.
//       if (rawRes.data.stable) {
//         system.health.isStable.infra = true
//       }
//       // Infra is unstable. Show red modal.
//       else {
//         system.health.isStable.infra = false
//         system.health.showModal.red
//       }
//     }
//     // Infra health report is unreliable (Likely a bug)
//     else {
//       system.health.isStable.infra = false
//       system.health.showModal.red
//     }
//   })

//   //Case 2: Nothing came back. Fastify is down.
//   evSource.onerror = () => {
//     console.log("@onerror - Fastify likely down")

//     system.health.showModal.red = true

//     evSource?.close()
//     evSource = null

//     // Periodically check if Fastify came back.
//     startPingLoop(system, evSource)
//   }
// }
