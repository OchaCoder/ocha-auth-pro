import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { webSafeBtoA } from "../../../___fn___/__f___utils-web-safe-64/web-safe-b-to-a"
import { setCookieFromServer } from "../../../___fn___/__f___utils-cookies/set-cookie-from-server"
import { ioKit } from "../../../___fn___/__f___io-kit/io-kit"
import { wretchResolver } from "../../../___fn___/__f___io/wretch-resolver"

// eslint-disable-next-line qwik/loader-location
export const useActionSignIn = globalAction$(
  async (userInput, ev) => {
    const { path, inputBuilder, validator } = ioKit.RA_SIGN_IN
    const beInput = inputBuilder(userInput)

    const rawRes = await wretchResolver(path, beInput, ev)

    if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

    if (rawRes.success && rawRes.sideEffects.cookie.hasData) {
      setCookieFromServer(ev.cookie, "at", rawRes.sideEffects.cookie.data.newAt.token, rawRes.sideEffects.cookie.data.newAt.maxAge)
      setCookieFromServer(ev.cookie, "bid", rawRes.sideEffects.cookie.data.newBid.token, rawRes.sideEffects.cookie.data.newBid.maxAge)
      setCookieFromServer(ev.cookie, "uid", webSafeBtoA(rawRes.data.userName), 60 * 60 * 24 * 30 * 6)
    }

    return rawRes
  },
  zod$(z.object({ email: z.string().email(), password: z.string() }))
)
