// import { server$ } from "@builder.io/qwik-city"
// import { System } from "~/___ctx___/internal/type-system"
// import { TbV } from "~/___typebox___/precompiled-validators"
// import { configPublic } from "~/config-public"
// import wretch from "wretch"
// import { startSse } from "./start-sse"

// export const startPingSingle = async (system: System, evSource: EventSource | null) => {
//   try {
//     const serverWretch = server$(async function () {
//       const rawRes = await wretch(`${configPublic.BACKEND_URL}/health-ping`)
//         .headers({ gatekeeper: "3bQdY1mE3agwuYqelMyjoS3GDaTY6iTtpxmg" })
//         .get()
//         .json()
//         .catch((err) => console.log("fetch failed@startPingSignle Can we say that Fastify is down?", err))

//       return rawRes
//     })

//     const rawRes = await serverWretch()

//     // Fastify is back, and the health report is reliable
//     if (TbV.health.ping.Check(rawRes)) {
//       // Stop the ping.
//       system.health.display.lastHeartbeat = rawRes.data.time
//       window.clearInterval(system.health.intervalId.ping!)
//       system.health.intervalId.ping = 0

//       // Fastify came back and infra is also stable.
//       if (rawRes.data.stable) {
//         system.health.isStable.infra = true
//         system.health.showModal.red = false
//         system.health.showModal.transition = true
//       }

//       // Fasity came back, but now the infra is unstable.
//       else {
//         system.health.isStable.infra = false
//         system.health.showModal.red = true
//       }

//       // Start the new SSE
//       window.clearInterval(system.health.intervalId.heartbeatCheck)
//       startSse(system, evSource)
//       system.health.lastHeartbeat = Date.now()
//     }
//     // Fastify is back, but the health report is not reliable (Likely a bug)
//     else {
//       system.health.isStable.infra = false
//       system.health.showModal.red
//     }
//   } catch (err) {
//     console.log("ERR::fastify is still down.")
//     // Ping failed... what case is this?
//     system.health.showModal.red
//   }
// }
