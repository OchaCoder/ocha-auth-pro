import type { RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async (ev) => {
  throw ev.redirect(301, `https://pagespeed.web.dev/analysis/https-ocha-auth-pro-ochacoder-com/igmtm6yjqi?form_factor=mobile`)
}
