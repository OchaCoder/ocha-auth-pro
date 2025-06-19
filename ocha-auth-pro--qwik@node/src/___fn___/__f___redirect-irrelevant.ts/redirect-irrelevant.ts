import type { RequestEvent, RequestEventLoader } from "@builder.io/qwik-city"

export const redirectIrrelevant = (ev: RequestEventLoader | RequestEvent, pass: string = "yes") => {
  const hasPermit = ev.cookie.get("permit")?.value === pass

  ev.cookie.delete("permit", { path: "/" })

  if (!hasPermit) throw ev.redirect(302, "/")
}
