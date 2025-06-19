import type { RequestEvent, RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city"
import wretch from "wretch"
import { wretchErrorHandler } from "./internal/wretch-error-handler"

export const wretchResolver = async (path: string, beInput: { hasData: true; data: unknown } | { hasData: false; data: null }, ev: RequestEventLoader | RequestEventAction | RequestEvent) => {
  const basePath = ev.env.get("BACKEND_URL")
  if (basePath === undefined) throw new Error("Backend url not found in the env file.")

  const rawRes = await wretch(basePath + path)
    .headers({ gatekeeper: "3bQdY1mE3agwuYqelMyjoS3GDaTY6iTtpxmg" })
    .post({ payload: beInput })
    .json()
    .catch((err) => wretchErrorHandler(err, ev))

  return rawRes
}
