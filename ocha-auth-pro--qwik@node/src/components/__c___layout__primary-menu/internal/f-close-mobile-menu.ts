import { $ } from "@builder.io/qwik"
import type { Ctr } from "~/___ctx___/internal/type-ctr"

/**
 * Resets all `anmMobileMenu` store values.
 * Should always be called when closing the mobile menu.
 */
export const closeMobileMenu = $((ctr: Ctr) => {
  ctr.mobileMenu.isOpen = false
  ctr.mobileMenu.isReplaced = false
  ctr.mobileMenu.isRotating = false
})
