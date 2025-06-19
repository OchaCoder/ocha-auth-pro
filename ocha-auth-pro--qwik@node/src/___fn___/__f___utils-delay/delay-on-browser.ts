import { isBrowser } from "@builder.io/qwik"

/**
 * A Promise-based timeout designed exclusively for use in browsers only.
 * Helps prevent silent failures in `clearTimeout` when a browser
 * timeout ID is used in a Node.js environment, as timers are runtime-specific.
 * For server-side delays, use `delayOnServer`.
 *
 * @param ms - The delay duration in milliseconds (non-negative).
 * @returns A Promise that resolves with the browser's timeout ID (`number`).
 * @throws Error if called in a non-browser environment (e.g., Node.js).
 */
export const delayOnBrowser = (ms: number): Promise<number> => {
  if (ms < 0) throw new Error("Delay duration must be non-negative")
  if (!isBrowser) throw new Error("delayOnBrowser is for client-side use only")

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => resolve(timeoutId), ms)
  })
}
