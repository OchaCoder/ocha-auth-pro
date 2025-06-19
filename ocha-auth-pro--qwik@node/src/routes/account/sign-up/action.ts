import { globalAction$, z, zod$ } from "@builder.io/qwik-city"
import { ioKit } from "../../../___fn___/__f___io-kit/io-kit"
import { wretchResolver } from "../../../___fn___/__f___io/wretch-resolver"

// eslint-disable-next-line qwik/loader-location
export const useActionSignUp = globalAction$(
  async (userInput, ev) => {
    const { path, inputBuilder, validator } = ioKit.RA_SIGN_UP_STEP1
    const beInput = inputBuilder(userInput)

    const rawRes = await wretchResolver(path, beInput, ev)

    if (!validator.Check(rawRes)) throw ev.redirect(302, "/oops")

    return rawRes
  },
  zod$(
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
  )
)
