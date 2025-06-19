import { Type } from "@sinclair/typebox"

/**
 * A single unified schema for validating any backend outputs.
 *
 * The use of this schema is limited to temporarily providing type to the shell properties
 * such as `sideEffects` inside `wretchResolverProtected`, specifically to avoid TS Error during devtime.
 *
 * For this reason, `data` property of this shcema is cast as `any` on purpose.
 *
 * To fully validate the raw response from the backend including `data` property,
 * use route specific schema inside the caller of `wretchResolver`
 * (usually `routeAction$`, `routeLoader$` etc).
 */
export const BoUserAny = Type.Union([
  // Case - success : true
  Type.Object({
    success: Type.Literal(true),
    data: Type.Any(), // <- Ignoring the route specific part.
    sideEffects: Type.Object({
      cookie: Type.Union([
        Type.Object({
          hasData: Type.Literal(true),
          data: Type.Object({
            newBid: Type.Object({
              token: Type.String(),
              maxAge: Type.Number(),
            }),
            newAt: Type.Object({
              token: Type.String(),
              maxAge: Type.Number(),
            }),
          }),
        }),
        Type.Object({
          hasData: Type.Literal(false),
          data: Type.Null(),
        }),
      ]),
      devNotes: Type.Array(Type.String()),
    }),
  }),

  // Case - success : false
  Type.Object({
    success: Type.Literal(false),

    errorAction: Type.Object({
      type: Type.Union([Type.Literal("red"), Type.Literal("yellow"), Type.Literal("green"), Type.Literal("close")]),
      message: Type.String(),
    }),
  }),
])

// export type TSchmAllOUser = TSchema & { static: Static<typeof OutUserAllAny> }
