// import { System } from "~/___ctx___/internal/type-system"

// import { startPingSingle } from "./start-ping-single"

// export const startPingLoop = (system: System, evSource: EventSource | null) => {
//   if (system.health.intervalId.ping !== 0) return // Already running

//   startPingSingle(system, evSource)

//   system.health.intervalId.ping = window.setInterval(() => startPingSingle(system, evSource), 1000 * 10)
// }
