import type { RequestEvent, RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city"

export const deleteCookieFromServer = (ev: RequestEventAction | RequestEventLoader | RequestEvent) => {
  ev.cookie.delete("at", { path: "/" })
  ev.cookie.delete("bid", { path: "/" })
  ev.cookie.delete("uid", { path: "/" })
}
