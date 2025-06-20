import type { RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async (ev) => {
  throw ev.redirect(301, "https://github.com/OchaCoder/ocha-auth-pro")
}
