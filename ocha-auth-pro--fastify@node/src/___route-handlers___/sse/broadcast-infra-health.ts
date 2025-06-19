// import type { FastifyInstance } from "fastify"
// import { connectedClientsInfra } from "./internal/initial-infra-health-check.js"

// // Tracks the last known state of Redis/Postgres health.
// // This helps us prevent sending duplicate SSE updates when nothing has changed.
// //
// // Initial values are set to 'true' by default, but this doesn't affect correctness:
// // - If a service is down at startup, the first health check will push the correct state.
// // - If both are healthy, this state already reflects reality, and no push is sent.
// const lastKnownHealth = { postgres: true, redis: true }

// // Called after every Redis or Postgres health check inside health-check plugin.
// // If the health state has changed since the last push, we notify clients via SSE.
// export const broadcastInfraHealth = (fastify: FastifyInstance) => {
//   const latestHealth = {
//     postgres: fastify.postgresAvailable,
//     redis: fastify.redisAvailable,
//   }

//   const needsPush = latestHealth.postgres !== lastKnownHealth.postgres || latestHealth.redis !== lastKnownHealth.redis

//   if (needsPush) {
//     for (const client of connectedClientsInfra) {
//       // 'send()' formats and writes SSE data using Node's raw HTTP stream.
//       client.send({ success: true, data: { stable: latestHealth.postgres && latestHealth.redis, initialCheck: false } })
//     }
//     lastKnownHealth.postgres = latestHealth.postgres
//     lastKnownHealth.redis = latestHealth.redis
//   }
// }
