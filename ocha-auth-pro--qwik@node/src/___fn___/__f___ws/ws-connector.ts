import { server$ } from "@builder.io/qwik-city"
import type { System } from "../../___ctx___/internal/type-system"
import { TbV } from "../../___typebox___/precompiled-validators"
import wretch from "wretch"

type MessageTypes = { channel: "heartbeat"; timestamp: number } | { channel: "infra"; stable: boolean; initialCheck: boolean }

let socket: WebSocket | null = null

let timeoutId: NodeJS.Timeout | null = null
let exponentialDelay = 3000

export const wsConnector = (system: System) => {
  // Avoiding multiple socket inits
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return socket // Already connected
  }

  socket = new WebSocket(import.meta.env.PUBLIC_WS_URL)
  socket.addEventListener("open", () => {
    exponentialDelay = 3000
    system.health.isStable.fastify = true
    console.log("🌐 WebSocket connected!")
  })

  socket.addEventListener("message", (e) => {
    const msg: MessageTypes = JSON.parse(e.data)

    if (msg.channel === "heartbeat") {
      console.log("⚡️ Heartbeat signal received!", msg.timestamp)
      const now = new Date(msg.timestamp)
      system.health.display.lastHeartbeat = now.toLocaleString()
    }

    if (msg.channel === "infra") {
      console.log("⚡️ Infra signal received!", msg.stable)
      system.health.showModal.isInitialLoad++ // Supress green modal on the initial load
      system.health.isStable.infra = msg.stable
    }
  })

  socket.addEventListener("close", () => {
    console.log("💤 WebSocket closed")
    system.health.showModal.isInitialLoad++ // Supress green modal on the initial load
    system.health.isStable.fastify = false
    schedulePing(system)
  })

  socket.addEventListener("error", (err) => {
    system.health.showModal.isInitialLoad++ // Supress green modal on the initial load
    console.error("⚠️ WebSocket error", err)
  })
}

const schedulePing = async (system: System) => {
  const jitter = Math.random() * 1000
  const delay = jitter + exponentialDelay
  console.log("📡 Attempting backend ping...Current delay is", delay)

  timeoutId = setTimeout(async () => {
    // server-side wretch
    const isBack = await server$(async function () {
      const rawRes = await wretch(`${this.env.get("BACKEND_URL")}/health-ping`)
        .headers({ gatekeeper: "3bQdY1mE3agwuYqelMyjoS3GDaTY6iTtpxmg" })
        .get()
        .json()
        .catch(() => {
          return { success: false, data: { stable: false, time: new Date().toISOString() } }
        })

      if (!TbV.health.ping.Check(rawRes)) throw new Error("[Bug] - Reply shape is not reliable")

      return rawRes.success
    })()

    // Still down -> Enter the loop with exponential delay
    if (!isBack) {
      console.log("🥀 Backend still down. Increasing delay...")
      exponentialDelay = Math.min(exponentialDelay * 2, 60000)

      schedulePing(system) // loop
    }
    // Success -> Safely reconnect
    else {
      console.log("🌱 Backend is back! Reconnecting...")
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = null
      wsConnector(system)
    }
  }, delay)
}
