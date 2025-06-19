// import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
// import { sseType } from "./sseType.js"

// export const connectedClientsInfra = new Set<{ send: (data: any) => void; end: () => void }>()

// export const initialInfraHealthCheck = (fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
//   const client = {
//     // 'raw.write()' is low-level Node API that lets us use Node stream to write SSE messages.
//     send: (data: any) => {
//       const payload = JSON.stringify(data)

//       //directly into the TCP stream
//       reply.raw.write(`event: ${sseType.INFRA_HEALTH}\ndata: ${payload}\n\n`)
//     },
//     end: () => {
//       reply.raw.end?.()
//     },
//   }

//   connectedClientsInfra.add(client)

//   // Send the initial health status immediately after connection.
//   // This gives the user instant feedback without waiting for a change.
//   const postgres = fastify.postgresAvailable
//   const redis = fastify.redisAvailable

//   client.send({ success: true, data: { stable: postgres && redis, initialCheck: true } })

//   // Clean up: remove the client if they disconnect (e.g., close tab).
//   // Prevents memory leaks and unnecessary message attempts.
//   request.raw.on("close", () => {
//     connectedClientsInfra.delete(client)
//   })
// }
