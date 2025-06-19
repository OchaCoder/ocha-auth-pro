import { $ } from "@builder.io/qwik"
import { server$ } from "@builder.io/qwik-city"

export const loadDarkMode = $(
  server$(function () {
    if (this.cookie.get("mode")?.value === "dark") return true
    else return false
  })
)
