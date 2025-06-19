import type { RequestEvent, RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city"
import { WretchError } from "wretch/resolver"

/**
 * Handles errors during fetch operations.
 * Converts backend error codes into frontend-friendly redirection or toast messages.
 *
 * @param err - The error object caught during a fetch.
 * @param ev - The Qwik route event (used to trigger redirects when needed).
 * @returns A soft error response for UI feedback, or throws a redirect.
 */
export const wretchErrorHandler = (err: unknown, ev: RequestEventAction | RequestEventLoader | RequestEvent) => {
  if (err instanceof WretchError) {
    // Fastify is down
    if (err.json.message === "Service Unavailable") {
      return { success: false, errorAction: { type: "red", message: "Connection is unstable. Please try again later." } }
    }

    switch (err.json.code) {
      // Health check triggered this
      case "ERR_SYSTEM_FAILURE":
        return { success: false, errorAction: { type: "red", message: "Connection is unstable. Please try again later." } }
        break

      // User tried to register with an existing email.
      case "ERR_EMAIL_ALREADY_EXISTS":
        return { success: false, errorAction: { type: "yellow", message: "This email address is already in use. Please use a different one." } }
        break

      // Sign-in flow
      case "ERR_UNREGISTERED_SIGNIN_REQUEST":
        return { success: false, errorAction: { type: "yellow", message: "We couldn't sign you in. Please check your email or password." } }
        break
      case "ERR_PASSWORD_NOT_MATCHING":
        return { success: false, errorAction: { type: "yellow", message: "We couldn't sign you in. Please check your email or password." } }
        break

      // Resend.com is down. Notice the user about system failure.
      case "ERR_EMAIL_SEND_FAILED":
        throw ev.redirect(303, "/reset/request/could-not-send/")
        break

      // Password reset flow
      case "ERR_PASS_RESET_REQUEST_W_UNREGISTERED_EMAIL":
        throw ev.redirect(303, "/account/reset-password-process/email-sent/")
        break

      case "ERR_RPT_EXPIRED":
        return { success: false, errorAction: { type: "yellow", message: "The link has expired." } }
        break

      case "ERR_RPT_IS_USED":
        return { success: false, errorAction: { type: "yellow", message: "The link was already used once." } }
        break

      // Email update flow
      case "ERR_UET_EXPIRED":
        return { success: false, errorAction: { type: "yellow", message: "The link has expired." } }
        break

      case "ERR_UET_IS_USED":
        return { success: false, errorAction: { type: "yellow", message: "The link was already used once." } }
        break

      // Password update flow
      case "ERR_PREV_PASSWORD_NOT_MATCHING":
        return { success: false, errorAction: { type: "yellow", message: "The old password is incorrect." } }
        break

      // Status code 400
      case "ERR_SUSPICIOUS_ACTIVITTY":
        console.log("wretchErrorHandler case", err.json.code, err)
        throw ev.redirect(302, "/hmm")
        break

      case "ERR_UNKNOWN":
        console.log("wretchErrorHandler case", err.json.code, err)
        throw ev.redirect(302, "/hmm")
        break

      // Status code 500
      case "ERR_DEFENSIVE_GUARD_BREACH":
      default:
        throw ev.redirect(302, "/oops")
        break
    }
  }
}
