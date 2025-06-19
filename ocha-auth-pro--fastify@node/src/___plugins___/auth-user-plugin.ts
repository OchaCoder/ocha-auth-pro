import fp from "fastify-plugin"
import type { FastifyPluginAsync, FastifyReply } from "fastify"
import type { ProtectedFastify, ProtectedRequest } from "../type.js"
import { rslvUserIdFromAt } from "../___fn___/index.js"

/**
 * This plugin handles authentication logic separately from route definitions,
 * favoring flexibility and clean separation of concerns. By using this approach,
 * protected routes remain clearly visible and manageable directly within `server.ts`,
 * offering a quick overview of the application's route structure at a glance.
 *
 * Alternative strategies include a fully modular plugin design,
 * where each feature encapsulates its own authentication and routes.
 */
export const authUserPluginDry: FastifyPluginAsync = fp(async (fastify: ProtectedFastify, _options) => {
  fastify.decorateRequest("user", null)
  fastify.addHook("preHandler", async (request: ProtectedRequest, reply: FastifyReply) => {
    // 1. Extract the access token from request body

    const { at } = request.body as { at: string }

    // 2. Validate, verify and parse the acces token to get user ID. Throw appropriate error at different stages.
    const id = await rslvUserIdFromAt(reply, at, `accessToken::at`)

    // 3. Attach user ID to request object
    request.user = { id }
  })
})

// Modular Approach
// export const authUserPluginModular: FastifyPluginAsync = fp(async (fastify, _options) => {
//   fastify.decorateRequest("user", null)
//   fastify.register(
//     async (protectedFastify) => {
//       protectedFastify.addHook("preHandler", async (request: ProtectedRequest, reply: FastifyReply) => {
//         // 1: Extract AT from request body
//         const { at } = request.body as { at: string }

//         // 2: Verify AT
//         const id = await resolveUserIdFromAccessToken(reply, at, `accessToken::at`)

//         // 3: Attach user ID to request object
//         request.user = { id }
//       })

//       protectedFastify.post("/dashboard", { schema: { body: ProtectedPayloadHasDataFalseSchema } }, userDashboard(protectedFastify))
//       protectedFastify.post("/edit", { schema: { body: ProtectedPayloadHasDataFalseSchema } }, userEdit(protectedFastify))
//       protectedFastify.post("/delete", { schema: { body: ProtectedPayloadHasDataFalseSchema } }, userDelete(protectedFastify))
//       protectedFastify.post("/update", { schema: { body: RequestBodyUserUpdateSchema } }, userUpdate(protectedFastify))
//       protectedFastify.post("/signout-from-all", { schema: { body: ProtectedPayloadHasDataFalseSchema } }, userSignOutFromAll(protectedFastify))
//       protectedFastify.post("/signout-from-one", { schema: { body: RequestBodyUserSignOutFromOneSchema } }, userSignOutFromOne(protectedFastify))
//     },
//     { prefix: "/protected" }
//   )
// })
