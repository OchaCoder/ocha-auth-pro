import { isServer } from "@builder.io/qwik"

/**
 * A Promise-based timeout designed exclusively for Node.js server environments.
 * Enables awareness of potential silent failures in `clearTimeout` due to
 * environment mismatches (e.g., Node.js versus browser).
 * For browser-side delays, use `delayOnBrowser`.
 *
 * @param ms - The delay duration in milliseconds (non-negative).
 * @returns A Promise that resolves with the server's timeout ID (`NodeJS.Timeout` object).
 * @throws Error if called in a browser.
 */
export const delayOnServer = (ms: number): Promise<NodeJS.Timeout> => {
  if (ms < 0) throw new Error("Delay duration must be non-negative")
  if (!isServer) throw new Error("delayOnServer is for server-side use only")

  return new Promise((resolve) => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => resolve(timeoutId), ms)
  })
}
