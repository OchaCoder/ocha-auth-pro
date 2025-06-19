import type { CookieOptions } from "@builder.io/qwik-city"
import { server$ } from "@builder.io/qwik-city"

// For client-side use
export const setCookieFromClient = server$(function (cookieName: string, cookieValue: string, maxAge?: number) {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    ...(maxAge && { maxAge }), // Includes maxAge only if it's a positive number (prevents accidental expiration)
  }

  this.cookie.set(cookieName, cookieValue, cookieOptions)
})
