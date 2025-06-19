import Fastify from "fastify"
import http from "http"
import { WebSocketServer } from "ws"

// Util
import "./___typebox___/register-format.js"
import "./___typebox___/precompiled-validators.js"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { config } from "./config.js"

// Plugin
import fastifyPostgres from "@fastify/postgres"
import fastifyRedis from "@fastify/redis"
import { errorHandlerPlugin } from "./___plugins___/error-handler.js"
import { authUserPluginDry } from "./___plugins___/auth-user-plugin.js"
import { healthCheckPostgres } from "./___plugins___/health-check-postgres.js"
import { healthCheckRedis } from "./___plugins___/health-check-redis.js"
import { headerCheckerPlugin } from "./___plugins___/header-checker-plugin.js"
import { ioredisOptions, ioredisAfterHandler, ioredisErrorDumper } from "./___redis___/_plugin/index.js"

// Fn
import { postgresStartupCheck } from "./___postgres___/postgres-startup-check.js"
import { logStartupMessage, hndlShutDown } from "./___fn___/index.js"

// Typebox Schema
import {
  BiUserPADeleteAccount,
  BiUserPASignOutFromAll,
  BiUserPASignOutFromOne,
  BiUserPAUpdateName,
  BiUserPAUpdatePassword,
  BiUserPLDashTop,
  BiUserRAProxyRefreshAt,
  BiUserRAResetPasswordStep1,
  BiUserRAResetPasswordStep2,
  BiUserRAResetPasswordStep3,
  BiUserRASignIn,
  BiUserRASignUpStep1,
  BiUserRASignUpStep2,
  BiUserRAUpdateEmailStep1,
  BiUserRAUpdateEmailStep2,
} from "./___typebox___/index.js"

// Route Handler - user
import {
  rhUserPADeleteAccount,
  rhUserPASignOutFromAll,
  rhUserPASignOutFromOne,
  rhUserPAUpdateName,
  rhUserPAUpdatePassword,
  rhUserPLDashTop,
  rhUserRAProxyRefreshAt,
  rhUserRAResetPasswordStep1,
  rhUserRAResetPasswordStep2,
  rhUserRAResetPasswordStep3,
  rhUserRASignIn,
  rhUserRASignUpStep1,
  rhUserRASignUpStep2,
  rhUserRAUpdateEmailStep1,
  rhUserRAUpdateEmailStep2,
} from "./___route-handlers___/user/index.js"

// Route handler - health
import { rhHealthPing } from "./___route-handlers___/health-ping/_rh__health-ping.js"

// Ws
import { wsFastifyHeartbeaet } from "./___ws___/ws-fastify-heartbeat.js"
import { wsInfraHealthBroadcaster } from "./___ws___/ws-infra-health-broadcaster.js"

// Create fastify instance
const fastify = Fastify({
  pluginTimeout: 6000, // default is 10000.
}).withTypeProvider<TypeBoxTypeProvider>()

// Add the global CSP header
fastify.addHook("onRequest", async (request, reply) => {
  reply.header("Content-Security-Policy", "frame-ancestors 'none'")
})

// Register Plugins
fastify.register(errorHandlerPlugin)

// Register header checker
fastify.register(headerCheckerPlugin)

// Health checkers
fastify.register(healthCheckRedis)
fastify.register(healthCheckPostgres)

// Register redis plugin
fastify.register(fastifyRedis, ioredisOptions()).after(ioredisAfterHandler(fastify))
fastify.after(() => fastify.redis.on("error", ioredisErrorDumper(fastify)))

// Register postgres plugin
fastify.register(fastifyPostgres, config.dbConfig)

// Register protected route.
// Route Map Overview — All protected and regular routes are registered here for visibility.
// This approach was implemented to favor a more exposed route structure style, and understandable code view at a glance.
fastify.register(
  async (protectedFastify) => {
    protectedFastify.register(authUserPluginDry)
    // Load
    protectedFastify.post("/load/dashboard-top", { schema: { body: BiUserPLDashTop } }, rhUserPLDashTop(protectedFastify))
    // Action
    protectedFastify.post("/action/delete-account", { schema: { body: BiUserPADeleteAccount } }, rhUserPADeleteAccount(protectedFastify))
    protectedFastify.post("/action/sign-out-from-all", { schema: { body: BiUserPASignOutFromAll } }, rhUserPASignOutFromAll(protectedFastify))
    protectedFastify.post("/action/sign-out-from-one", { schema: { body: BiUserPASignOutFromOne } }, rhUserPASignOutFromOne(protectedFastify))
    protectedFastify.post("/action/update-name", { schema: { body: BiUserPAUpdateName } }, rhUserPAUpdateName(protectedFastify))
    protectedFastify.post("/action/update-password", { schema: { body: BiUserPAUpdatePassword } }, rhUserPAUpdatePassword(protectedFastify))
  },
  { prefix: "/user/protected" }
)

// Regular routes
fastify.post("/user/regular/action/proxy-refresh-at", { schema: BiUserRAProxyRefreshAt }, rhUserRAProxyRefreshAt(fastify))
fastify.post("/user/regular/action/sign-up-step-1", { schema: BiUserRASignUpStep1 }, rhUserRASignUpStep1(fastify))
fastify.post("/user/regular/action/sign-up-step-2", { schema: BiUserRASignUpStep2 }, rhUserRASignUpStep2(fastify))
fastify.post("/user/regular/action/sign-in", { schema: BiUserRASignIn }, rhUserRASignIn(fastify))

// Kept public on purpose. These routes don't rely on the normal auth flow using `at`.
// Special V4 tokens such as `rpt` or `uet` are used within the one-time auth context.
fastify.post("/user/regular/action/reset-password-step-1", { schema: BiUserRAResetPasswordStep1 }, rhUserRAResetPasswordStep1(fastify))
fastify.post("/user/regular/action/reset-password-step-2", { schema: BiUserRAResetPasswordStep2 }, rhUserRAResetPasswordStep2(fastify))
fastify.post("/user/regular/action/reset-password-step-3", { schema: BiUserRAResetPasswordStep3 }, rhUserRAResetPasswordStep3(fastify))
fastify.post("/user/regular/action/update-email-step-1", { schema: { body: BiUserRAUpdateEmailStep1 } }, rhUserRAUpdateEmailStep1(fastify))
fastify.post("/user/regular/action/update-email-step-2", { schema: { body: BiUserRAUpdateEmailStep2 } }, rhUserRAUpdateEmailStep2(fastify))

// Health Event
fastify.get("/health-ping", rhHealthPing(fastify))

// Fatal synchronous errors anywhere in the app.
// Catches Global Errors (even outside Fastify).
process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception :: Preventing server crash:", err)
  process.exit(1)
})

// Async promise errors that weren’t caught.
// Catches Global Errors (even outside Fastify).
process.on("unhandledRejection", (reason) => {
  console.error("🔥 Unhandled Rejection :: Reason:", reason)
  process.exit(1)
})

// Raw HTTP server
// [Note] Do NOT use `http.createServer(fastify.server)` — it won't work!
// `fastify.server` is the raw internal Node.js HTTP server instance Fastify created,
// NOT a request handler function.
//
// To use Fastify with a custom `http.createServer`, we must manually pass requests to it.
//
// This `fastify.routing(req, res)` is the correct internal handler that passes the request
// to Fastify's routing system. Without this, Fastify routes won't respond at all.
//
// This pattern is required when attaching Fastify to a raw HTTP server,
// for example when using `ws` or `socket.io` on the same port.
const httpServer = http.createServer((req, res) => {
  fastify.routing(req, res) // ✅ This will route requests via Fastify
})

const wss = new WebSocketServer({ server: httpServer, path: "/ws" })
wsFastifyHeartbeaet(wss)
wsInfraHealthBroadcaster(wss)

const startServer = async () => {
  try {
    await fastify.ready()

    await postgresStartupCheck(fastify)

    fastify.healthRedis("STARTUP")

    logStartupMessage(fastify)

    httpServer.listen(config.PORT, "0.0.0.0")

    // Listen for Ctrl+C or system termination
    process.on("SIGINT", () => hndlShutDown(fastify))
    process.on("SIGTERM", () => hndlShutDown(fastify))
  } catch (err) {
    console.error("💥Server failed to start:", err)
    process.exit(1)
  }
}

startServer()
