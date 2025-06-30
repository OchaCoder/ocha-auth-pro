import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"
import { Home } from "../components/__c___layout__home/Home"

export default component$(() => {
  return (
    <>
      <Home />
    </>
  )
})

export const head: DocumentHead = {
  title: "Ocha-Auth-Pro",
  meta: [
    {
      name: "Ocha-Auth-Pro : Secure, Scalable Auth System from Scratch",
      content: "A lovingly overbuilt, feature-rich authentication system built with Qwik, Fastify, PostgreSQL, Redis, Paseto V4, Argon2, Prometheus, Grafana, and more.",
    },
  ],
}
