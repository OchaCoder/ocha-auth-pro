import "dotenv/config"
import { argon2id, argon2i, argon2d } from "argon2"
import { TbV } from "./___typebox___/precompiled-validators.js"

const argon2TypeMap: Record<"argon2id" | "argon2i" | "argon2d", number> = {
  argon2id: argon2id,
  argon2i: argon2i,
  argon2d: argon2d,
}
const envArgon2Type = process.env.ARGON2_TYPE as "argon2id" | "argon2i" | "argon2d"

const rawEnv = {
  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL,
  // Fastify
  PORT: Number(process.env.PORT),

  MESSAGE: process.env.MESSAGE,
  NODE_ENV: process.env.NODE_ENV,

  // Neon Postgres
  dbConfig: {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT), // ✅ Postgres port is normally 5432
    connectionTimeoutMillis: process.env.PGCONNECTIONTIMEOUT ? Number(process.env.PGCONNECTIONTIMEOUT) : 5000,
    ssl: process.env.PGSSL_REJECT_UNAUTHORIZED === "true" ? { rejectUnauthorized: true } : false,
  },

  resend: process.env.RESEND, // Connection string.

  argon2Config: {
    type: argon2TypeMap[envArgon2Type], // argon2id | argon2i | argon2d
    memoryCost: Number(process.env.ARGON2_MEMORY_COST),
    timeCost: Number(process.env.ARGON2_TIME_COST),
    parallelism: Number(process.env.ARGON2_PARALLELISM),
  },

  pasetoKeys: {
    public: {
      at: process.env.PASETO_PUBLIC_KEY_AT,
      rt: process.env.PASETO_PUBLIC_KEY_RT,
      sut: process.env.PASETO_PUBLIC_KEY_SUT,
      rpt: process.env.PASETO_PUBLIC_KEY_RPT,
      uet: process.env.PASETO_PUBLIC_KEY_UET,
    },
    secret: {
      at: process.env.PASETO_SECRET_KEY_AT,
      rt: process.env.PASETO_SECRET_KEY_RT,
      sut: process.env.PASETO_SECRET_KEY_SUT,
      rpt: process.env.PASETO_SECRET_KEY_RPT,
      uet: process.env.PASETO_SECRET_KEY_UET,
    },
  },
  ttl: { at: process.env.AT_TTL, rt: process.env.RT_TTL, rpt: process.env.RPT_TTL },
}

export const config = TbV.env.Decode(rawEnv)
