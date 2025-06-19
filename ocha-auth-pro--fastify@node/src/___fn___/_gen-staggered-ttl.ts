import { config } from "../config.js"
import { rslvSecFromTtl } from "./internal/index.js"

export const genStaggeredTtl = () => {
  // Slightly stagger expiration times to mitigate minor time drifts
  // caused by network lag, reducing redundant operations and edge-case errors.

  const rtExpInSec = rslvSecFromTtl(config.ttl.rt) // Unix timestamp (seconds)
  const atExpInSec = rslvSecFromTtl(config.ttl.at) // Unix timestamp (seconds)

  // Expected expiration time format:
  // - Redis (SET + EX): number (seconds)
  // - Cookie max-age: number (seconds)
  // - Paseto expiredIn : string (e.g. '2000 seconds')
  const exp = {
    rt: {
      pasetoExpiresIn: `${rtExpInSec} seconds`, // Should expire last
      redisSetEX: rtExpInSec - 15, // Redis entry expires 15s before RT
      cookieMaxAge: rtExpInSec - 60, // Cookie expires first (60s before RT)
    },
    at: {
      pasetoExpiresIn: `${atExpInSec} seconds`,
      cookieMaxAge: atExpInSec - 30, // Cookie expires before AT does
    },
  }

  return exp
}
