import { $, component$, Slot, useContext, useOnWindow } from "@builder.io/qwik"
import { type RequestHandler } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../___ctx___/context-global-state"
import { Footer } from "../components/__c___layout__footer"
import { HealthModalDown, HealthModalRecovered } from "../components/__c__modal__health"
import { Toast } from "../components/__c__toast"
import { AuthModal } from "../components/__c__modal__auth"
import { SubMenu } from "../components/__c___layout__sub-menu"
import { PrimaryMenuDesktop, PrimaryMenuMobile } from "../components/__c___layout__primary-menu"
import { initialSetUp } from "../___fn___/__f___setup/initial-setup"
import { AuthStatus } from "~/components/__c___layout__auth-status"

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export default component$(() => {
  const globalState = useContext(ContextIdGlobalState)

  useOnWindow(
    "load",
    $(() => initialSetUp(globalState))
  )
  const primaryMenuHeight = `56px`

  return (
    <div>
      <PrimaryMenuDesktop height={primaryMenuHeight} />
      <PrimaryMenuMobile height={primaryMenuHeight} />

      <SubMenu />
      <AuthStatus />

      <AuthModal />

      <Toast />

      <HealthModalDown />
      <HealthModalRecovered />

      <Slot />
      <Footer />
    </div>
  )
})
