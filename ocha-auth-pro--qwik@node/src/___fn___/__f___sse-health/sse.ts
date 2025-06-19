// import { System } from "~/___ctx___/internal/type-system"

// import { startSse } from "./internal/start-sse"

// /**
//  * Call this function inside `initialSetup` for immediate start.
//  *
//  *
//  * @param system
//  *
//  * @returns
//  */
// export const sseHealthChecker = (system: System) => {
//   let evSource: EventSource | null = null

//   startSse(system, evSource)

//   return () => {
//     if (evSource !== null) (evSource as EventSource).close()
//     if (system.health.intervalId.ping !== 0) window.clearInterval(system.health.intervalId.ping)
//     if (system.health.intervalId.heartbeatCheck !== 0) window.clearInterval(system.health.intervalId.heartbeatCheck)
//   }
// }
