import type { WebSocketServer } from "ws"
import { ee } from "../___ee___/event-emitter.js"

let wss: WebSocketServer | null = null

/**
 * Tracks the last known state of Redis/Postgres health.
 * This helps us prevent sending duplicate updates when nothing has changed.
 *
 * Initial values are set to 'true' by default, but this doesn't affect correctness:
 * - If an infra is down at startup, the first health check will push the correct state.
 * - If both are healthy, this state already reflects reality, and no push is sent.
 */
let lastKnownHealth = { pg: true, redis: true }

/**
 * An event emitter (`ee.emit()`) is called after every Redis or Postgres health check.
 * See(`health-check-postgres.ts` or `health-check-redis.ts`)
 *
 * If the health state has changed since the last broadcast, we notify clients via WebSocket.
 */
export const wsInfraHealthBroadcaster = (wss: WebSocketServer) => {
  ee.on("infra-health", (newestHealth: typeof lastKnownHealth) => {
    if (!wss) return

    const didChangePg = newestHealth.pg !== lastKnownHealth.pg
    const didChangeRedis = newestHealth.redis !== lastKnownHealth.redis

    const needsBroadcast = didChangePg || didChangeRedis

    if (!needsBroadcast) return // Nothing has changed. No need to broadcast or update `lastKnownHealth`

    lastKnownHealth = { ...newestHealth }

    const isStable = newestHealth.pg && newestHealth.redis
    const message = JSON.stringify({ channel: "infra", stable: isStable, initialCheck: false })

    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) {
        client.send(message)
      }
    }
  })
}
