import { $ } from "@builder.io/qwik"
import { server$ } from "@builder.io/qwik-city"

import { webSafeAtoB } from "../../__f___utils-web-safe-64/web-safe-a-to-b"
import { setCookieFromServer } from "~/___fn___/__f___utils-cookies/set-cookie-from-server"

export const loadUserName = $(
  server$(function () {
    const uid = this.cookie.get("uid")?.value
    if (uid) {
      // 1. Reset maxAge of uid
      setCookieFromServer(this.cookie, "uid", uid, 60 * 60 * 24 * 30 * 6)

      // 2. Decode userName from uid and return
      return webSafeAtoB(uid)
    } else return ""
  })
)
