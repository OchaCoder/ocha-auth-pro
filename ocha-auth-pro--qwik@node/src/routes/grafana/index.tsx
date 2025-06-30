import type { RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async (ev) => {
  throw ev.redirect(301, "https://grafana.ochacoder.com/public-dashboards/58dc9e815fda49488770a306906415c9")
}

// const useLoader = routeLoader$((ev) => {
//   throw ev.redirect(301, "https://grafana.ochacoder.com/public-dashboards/27e18136f6b340f9a5e7ca6d28d9d163")
// })

// export default component$(() => {
//   useLoader()
//   return <>Loading...</>
// })
