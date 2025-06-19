import { component$, createContextId, useContextProvider, useStore, Slot } from "@builder.io/qwik"
import type { GlobalState } from "./type-global-state"

export const ContextIdGlobalState = createContextId<GlobalState>("context-id-global-state")

export const ContextProviderGlobalState = component$(() => {
  // Global state includes 'ctr', 'user' and 'system'.

  const globalState = useStore<GlobalState>({
    // Control related states
    ctr: {
      isDarkMode: false,
      authModal: { isOpen: false, type: "SIGN_IN", locBeforeModal: "/" },
      mobileMenu: { isOpen: false, isRotating: false, isReplaced: false },
      toast: { arr: [] },
    },

    // User related state
    user: { name: "", email: "", rpt: "" },

    // System related state
    system: {
      health: {
        display: { lastHeartbeat: "" },
        isStable: { fastify: true, infra: true },
        showModal: { isInitialLoad: 0 },
        reconnectStrategy: { exponentialDelay: 3000, timeoutId: 0 },
      },
    },
  })

  useContextProvider(ContextIdGlobalState, globalState)

  return <Slot />
})
