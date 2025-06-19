import { Static, Type } from "@sinclair/typebox"

// Expected shape of the request body for this route
export const BiUserRAProxyRefreshAt = Type.Object({
  bid: Type.String(),
  proxyPath: Type.String(),
  payload: Type.Object({
    hasData: Type.Boolean(),
    data: Type.Any(),
  }),
})

export type TBiUserRAProxyRefreshAt = Static<typeof BiUserRAProxyRefreshAt>
