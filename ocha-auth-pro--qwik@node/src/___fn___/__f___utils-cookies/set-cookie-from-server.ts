import type { Cookie, CookieOptions } from "@builder.io/qwik-city"

// For server-side use
export const setCookieFromServer = (cookie: Cookie, cookieName: string, cookieValue: string, maxAge?: number) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    ...(maxAge && { maxAge }), // Includes maxAge only if it's a positive number (prevents accidental expiration)
  }

  cookie.set(cookieName, cookieValue, cookieOptions)
}
