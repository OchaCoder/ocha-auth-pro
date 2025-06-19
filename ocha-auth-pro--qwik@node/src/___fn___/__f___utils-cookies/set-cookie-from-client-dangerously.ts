/**
 * Sets a cookie from client-side JavaScript to pass temporary values between routes.
 * This is a limited-scope utility — do not use for storing secrets or authentication tokens.
 *
 * The cookie is **not HttpOnly**, and thus readable by any JS on the page.
 * Delete this cookie immediately after extracting its value.
 *
 * @param cookieName - The name of the cookie to set
 * @param cookieValue - The value to assign to the cookie
 */
export const setCookieFromClientDangerously = (cookieName: string, cookieValue: string): void => {
  const cookieString = `${cookieName}=${cookieValue}; path=/; SameSite=Strict; Secure; maxAge:10`
  document.cookie = cookieString
}
