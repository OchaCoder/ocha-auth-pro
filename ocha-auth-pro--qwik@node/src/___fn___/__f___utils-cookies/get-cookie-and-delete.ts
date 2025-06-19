import type { RequestEvent } from "@builder.io/qwik-city"

export const getCookieAndDelete = (ev: RequestEvent, cookieName: string): string | "The cookie was undefined" => {
  const value = ev.cookie.get(cookieName)?.value

  ev.cookie.delete(cookieName, { path: "/" })

  if (value === undefined) return "The cookie was undefined"

  return value
}
