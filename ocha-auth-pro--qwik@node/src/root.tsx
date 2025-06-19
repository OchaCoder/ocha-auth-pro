import { component$ } from "@builder.io/qwik"
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city"
import { RouterHead } from "./components/router-head/router-head"
import { isDev } from "@builder.io/qwik"

import "./___styles___/00-reset.css"
import "./___styles___/01-variables.css"
import "./___styles___/02-responsive-fonts.css"
import "./___styles___/03-elements.css"
import "./___styles___/04-globals.css"
import "./___styles___/05-utilities.css"
import "./___styles___/06-animations.css"
import "./___styles___/07-attributes.css"
import "./___styles___/08-responsive-layout.css"
import { ContextProviderGlobalState } from "./___ctx___/context-global-state"

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
      </head>
      <body lang="en">
        <ContextProviderGlobalState>
          <RouterOutlet />
        </ContextProviderGlobalState>
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  )
})
