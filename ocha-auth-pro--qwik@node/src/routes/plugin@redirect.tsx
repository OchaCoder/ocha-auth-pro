import { type RequestHandler } from "@builder.io/qwik-city"

/**
 * This plugin appends a trailing slash to all requests that don't already have one.
 */
export const onRequest: RequestHandler = async ({ redirect, pathname }) => {
  if (!pathname.endsWith("/")) throw redirect(301, `${pathname}/`)
}
