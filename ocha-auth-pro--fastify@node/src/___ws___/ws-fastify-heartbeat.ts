import type { WebSocketServer } from "ws"

export const wsFastifyHeartbeaet = (wss: WebSocketServer) => {
  // Global shared timer
  setInterval(() => {
    const message = JSON.stringify({ channel: "heartbeat", timestamp: Date.now() })

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message)
      }
    })
  }, 5000)

  // Connected to the raw Node HTTP server
  wss.on("connection", (ws) => {
    console.log("🔌 Client connected (total:", wss.clients.size, ")")

    ws.on("close", () => {
      console.log("❌ Client disconnected (total:", wss.clients.size, ")")
    })
  })
}
