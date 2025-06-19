// import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

// import { sseHeaders } from "./internal/sse-headers.js"
// import { fastifyHeartbeat } from "./internal/fastify-heartbeat.js"
// import { initialInfraHealthCheck } from "./internal/initial-infra-health-check.js"

// export const sse = (fastify: FastifyInstance) => {
//   return async (request: FastifyRequest, reply: FastifyReply) => {
//     sseHeaders(request, reply)

//     fastifyHeartbeat(request, reply)

//     initialInfraHealthCheck(fastify, request, reply)
//   }
// }
