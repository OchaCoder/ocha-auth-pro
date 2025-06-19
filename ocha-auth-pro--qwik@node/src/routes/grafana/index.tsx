import type { RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async (ev) => {
  throw ev.redirect(303, `https://grafana.ochacoder.com/public-dashboards/27e18136f6b340f9a5e7ca6d28d9d163`)
}
