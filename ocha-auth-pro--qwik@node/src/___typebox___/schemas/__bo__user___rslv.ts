import type { TSchema } from "@sinclair/typebox"
import { Type } from "@sinclair/typebox"

/**
 * Use this function with route specific data schema to resolve a schema able to
 * validate the full backend output.
 *
 * The output schema is *NOT* supposed to be used inside `wretchResolver`.
 * To provide temporary type to the shell properties to the raw backend output
 * in order to avoid TS Error during dev time inside `wretchResolver`,
 * use `OutUserAllAny` schema.
 *
 * @param - Route specific schema for the `data` property
 * @returns - Schema able to validate the full route specific output
 */
export const boUserRslv = <T extends TSchema>(dataSchema: T) =>
  Type.Union([
    Type.Object({
      success: Type.Literal(true),

      data: dataSchema,

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
    Type.Object({
      success: Type.Literal(false),

      errorAction: Type.Object({
        type: Type.Union([Type.Literal("red"), Type.Literal("yellow"), Type.Literal("green"), Type.Literal("close")]),
        message: Type.String(),
      }),
    }),
  ])
