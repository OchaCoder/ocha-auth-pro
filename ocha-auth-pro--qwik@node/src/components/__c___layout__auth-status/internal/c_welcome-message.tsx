import { component$, useContext } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"

export const WelcomeMessage = component$(() => {
  const { user } = useContext(ContextIdGlobalState)

  return (
    <>
      <div class={`flex justify-end items-center italic`}>
        <span>Welcome, {user.name === "" ? "guest" : <Link href={`/account/dashboard/`}>{user.name}</Link>}!</span>
      </div>
    </>
  )
})
