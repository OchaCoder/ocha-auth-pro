// import type { FastifyReply, FastifyRequest } from "fastify"
// import { sseType } from "./sseType.js"

// export const connectedClientsHeartbeat = new Set<{ send: () => void; end: () => void }>()

// export const fastifyHeartbeat = (request: FastifyRequest, reply: FastifyReply) => {
//   // Create a thin client wrapper to manage sending messages
//   const client = {
//     send: () => {
//       const data = JSON.stringify({ success: true, data: { time: new Date().toISOString() } })

//       reply.raw.write(`event: ${sseType.FASTIFY_HEARTBEAT}\ndata: ${data}\n\n`)
//     },
//     end: () => {
//       reply.raw.end?.()
//     },
//   }

//   // Add the client to the global Set for future broadcasts
//   connectedClientsHeartbeat.add(client)

//   // Send a heartbeat every 30 seconds
//   const intervalId = setInterval(() => {
//     for (const client of connectedClientsHeartbeat) {
//       client.send()
//     }
//   }, 1000 * 30)

//   const data = JSON.stringify({ success: true, data: { time: new Date().toISOString() } })
//   reply.raw.write(`event: ${sseType.FASTIFY_HEARTBEAT}\ndata: ${data}\n\n`)

//   // 🧼 Cleanup when the client disconnects (browser reload, tab closed, etc.)
//   request.raw.on("close", () => {
//     console.log("🌳🌳🌳close has ran!")
//     clearInterval(intervalId)
//     connectedClientsHeartbeat.delete(client)
//     console.log("🌳🌳🌳connectedClientsHeartbeat.size:", connectedClientsHeartbeat.size)
//   })
// }
