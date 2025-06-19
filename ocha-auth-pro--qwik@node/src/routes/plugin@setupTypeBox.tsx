import { type RequestHandler } from "@builder.io/qwik-city"

import "../___typebox___/precompiled-validators"

/**
 * These side-effect imports set up TypeBox's `FormatRegistry` and precompile all validators
 * at initial server startup.
 *
 * Once imported, the results are cached by the module system and persist throughout runtime.
 * Although this plugin runs on every request, `FormatRegistry.Set()` and `TypeCompiler.Compile()`
 * will not run repeatedly or wastefully — they were already executed once at import time.
 */
export const onRequest: RequestHandler = async () => {}
