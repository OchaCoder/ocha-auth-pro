// import { System } from "~/___ctx___/internal/type-system"

// export const heartbeatChecker = (system: System) => {
//   system.health.intervalId.heartbeatCheck = window.setInterval(() => {
//     // Fastify's heartbeat hasn't arrived for more than 60 senconds.
//     // Consider dead.
//     if (Date.now() - system.health.lastHeartbeat > 1000 * 60) {
//       system.health.showModal.red
//       system.health.isStable.fastify = false

//       console.log("💔No heartbeat", Date.now() - system.health.lastHeartbeat)
//     }
//     // Fastify's heartbeat is arriving.
//     else {
//       system.health.isStable.fastify = true
//       console.log("💗Alive!", Date.now() - system.health.lastHeartbeat)
//     }
//   }, 1000 * 10)
// }
