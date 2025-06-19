import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { IconSad } from "~/components/__c_utils__svg"

export const SignUpError = component$(({ errMessage, countDown }: { errMessage: string; countDown: number }) => {
  return (
    <>
      <div>
        <IconSad size={30} fill={`var(--dual-dark)`} />
        <IconSad size={30} fill={`var(--dual-dark)`} />
        <IconSad size={30} fill={`var(--dual-dark)`} />
      </div>

      <h1 class={`font-size-14 color-theme-sub weight-800`}>{errMessage}</h1>

      <div class={`font-size-12`}>Please try again.</div>
      {/* Redirect Message */}
      <div>
        <p>
          {`We will redirect you to `}

          <Link href={`/`} class={`weight-800`}>
            home
          </Link>
          {` in `}
          <span class={`weight-800`}>{countDown}</span>
          {` seconds.`}
        </p>
      </div>
    </>
  )
})
