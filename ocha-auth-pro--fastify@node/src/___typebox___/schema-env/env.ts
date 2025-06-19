import { Static, Type } from "@sinclair/typebox"
import { argon2id, argon2i, argon2d } from "argon2"

// Define environment variable schema
export const Env = Type.Object({
  // Frontend
  FRONTEND_URL: Type.String(),
  // Fastify
  PORT: Type.Number(), // Will convert string to number

  MESSAGE: Type.String(),
  NODE_ENV: Type.Union([Type.Literal("development"), Type.Literal("production"), Type.Literal("test")]),
  // Neon Postgres
  dbConfig: Type.Object({
    host: Type.String(),
    database: Type.String(),
    user: Type.String(),
    password: Type.String(),
    port: Type.Number({ default: 5432 }),
    connectionTimeoutMillis: Type.Number(),
    ssl: Type.Union([
      Type.Boolean(),
      Type.Object({
        rejectUnauthorized: Type.Boolean(),
      }),
    ]),
  }),
  resend: Type.String(),
  // Argon2
  argon2Config: Type.Object({
    type: Type.Union([Type.Literal(argon2id), Type.Literal(argon2i), Type.Literal(argon2d)]),
    memoryCost: Type.Number(),
    timeCost: Type.Number(),
    parallelism: Type.Number(),
  }),
  // Paseto
  pasetoKeys: Type.Object({
    secret: Type.Object({
      at: Type.String(),
      rt: Type.String(),
      sut: Type.String(),
      rpt: Type.String(),
      uet: Type.String(),
    }),
    public: Type.Object({
      at: Type.String(),
      rt: Type.String(),
      sut: Type.String(),
      rpt: Type.String(),
      uet: Type.String(),
    }),
  }),
  ttl: Type.Object({
    at: Type.String(), // e.g., "5 seconds"
    rt: Type.String(), // e.g., "72 hours"
    rpt: Type.String(), // e.g., "180 seconds"
  }),
})

export type TEnv = Static<typeof Env>
