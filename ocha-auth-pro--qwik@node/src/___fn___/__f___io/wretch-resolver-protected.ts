import type { RequestEvent, RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city"
import wretch from "wretch"
import { wretchErrorHandler } from "./internal/wretch-error-handler"
import { redirectUnauth } from "./internal/redirect-unauth"
import { setCookieFromServer } from "../__f___utils-cookies/set-cookie-from-server"
// import { configPublic } from "~/config-public"
import { TbV } from "~/___typebox___/precompiled-validators"

export const wretchResolverProtected = async (path: string, beInput: { hasData: true; data: unknown } | { hasData: false; data: null }, ev: RequestEventLoader | RequestEventAction | RequestEvent) => {
  const basePath = ev.env.get("BACKEND_URL")
  if (basePath === undefined) throw new Error("Backend url not found in the env file.")

  // 1. Eliminate `( !at && !bid )` pattern.
  const { at, bid } = redirectUnauth(ev)

  // 2-1. Use the `at` to proceed to the backend operation.
  if (at) {
    const rawReply = await wretch(basePath + path)
      .headers({ gatekeeper: "3bQdY1mE3agwuYqelMyjoS3GDaTY6iTtpxmg" })
      .post({ at, payload: beInput })
      .json()
      .catch((err) => wretchErrorHandler(err, ev))

    return rawReply
  }

  // 2-2. Use the `bid` to proceed to the backend operation.

  /**
   * `/proxy-adapter/refresh-access-token` is a special backend route that proxies request to the
   * originally desired route directly within Fastify after successfully generating a new `at`,
   * without requireing an extra round trip between Qwik and Fastify.
   * This route requires always requires three things:
   * 1. the `bid`, 2. the desired path for the request to be forwarded to, and 3. the payload.
   */
  else if (bid) {
    const rawRes = await wretch(`${basePath}/user/regular/action/proxy-refresh-at`)
      .headers({ gatekeeper: "3bQdY1mE3agwuYqelMyjoS3GDaTY6iTtpxmg" })
      .post({ bid, proxyPath: path, payload: beInput })
      .json()
      .catch((err) => wretchErrorHandler(err, ev))

    // ⚠️ This `Check` is for providing type only.

    if (!TbV.bo.user.any.Check(rawRes)) throw ev.redirect(302, "/oops")

    // If `bid` was used, and the reply comes back as `success:true`, the cookie data for
    // updating the `at` and the `bid` is guaranteed to exist.

    // On the other hand, if reply comes back as `success:false`, this usually means that the
    // user signin via `bid` failed in a normal fashion, in which case the frontend is
    // required to show an appropriate toast message.
    // (e.g. 'We couldn't sign you in. Please check your email or password.')

    // If the backend had detected more critical scenarios such as suspicious activity or
    // a possible bug scenario, these cases are already handled inside catch-block by
    // `wretchErrorhandler`, and will not even reach here.
    //

    if (rawRes.success === true) {
      // This is a bug. If `bid` was used, and the reply comes back as `success:true`,
      // `hasData` should be true, and the cookie data should also be present.
      if (!rawRes.sideEffects.cookie.hasData) throw ev.redirect(302, "/oops")

      setCookieFromServer(ev.cookie, "at", rawRes.sideEffects.cookie.data.newAt.token, rawRes.sideEffects.cookie.data.newAt.maxAge)
      setCookieFromServer(ev.cookie, "bid", bid, rawRes.sideEffects.cookie.data.newBid.maxAge)
      // Fastify is designed to return the same `bid` as `validRes.sideEffects.cookie.data.newBid.token`,
      // so the following code will yield in the same result.
      //setCookieFromServer(ev.cookie, "bid", validRes.sideEffects.cookie.data.newBid.token, validRes.sideEffects.cookie.data.newBid.maxAge)
    }

    // Return the validated reply.
    return rawRes
  }
}
