import type { RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async (ev) => {
  throw ev.redirect(302, `/404`)
}
