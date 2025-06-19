import { component$, useContext } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { IconHappy } from "~/components/__c_utils__svg"

export const SignUpSuccess = component$(({ countDown }: { countDown: number }) => {
  const { user } = useContext(ContextIdGlobalState)
  return (
    <>
      <div>
        <IconHappy size={30} fill={`var(--dual-dark)`} />
        <IconHappy size={30} fill={`var(--dual-dark)`} />
        <IconHappy size={30} fill={`var(--dual-dark)`} />
      </div>
      <h1 class={`font-size-14 weight-800 color-theme-sub`}>{`Welcome ${user.name}!`}</h1>
      <p>You are signed up with us! Enjoy trying out this demo!</p>
      {/* Redirect Message */}
      <div>
        <p>
          {`We will redirect you to `}

          <Link href={`/account/dashboard`} class={`weight-800`}>
            dashboard
          </Link>
          {` in `}
          <span class={`weight-800`}>{countDown}</span>
          {` seconds.`}
        </p>
      </div>
    </>
  )
})
