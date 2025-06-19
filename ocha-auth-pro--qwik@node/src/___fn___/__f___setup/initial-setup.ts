import { $, isBrowser } from "@builder.io/qwik"
import { loadUserName } from "./internal/load-user-name"
import { loadDarkMode } from "./internal/load-dark-mode"
import type { GlobalState } from "../../___ctx___/type-global-state"
import { wsConnector } from "../__f___ws/ws-connector"

export const initialSetUp = $(async ({ ctr, user, system }: GlobalState) => {
  ctr.isDarkMode = await loadDarkMode()

  user.name = await loadUserName()

  wsConnector(system)

  if (isBrowser) document.documentElement.classList.toggle("dark", ctr.isDarkMode)
})
