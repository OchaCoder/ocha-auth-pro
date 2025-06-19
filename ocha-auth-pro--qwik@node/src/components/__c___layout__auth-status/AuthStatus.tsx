import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik"
import { WelcomeMessage } from "./internal/c_welcome-message"
import { ButtonStartAuth } from "./internal/c_button-start-auth"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { modalControl } from "../__c__modal__auth"
import { server$, useLocation } from "@builder.io/qwik-city"
import { SignOutButtons } from "./internal/c_sign-out-buttons"

export const AuthStatus = component$(() => {
  const { ctr, user } = useContext(ContextIdGlobalState)
  const loc = useLocation().url.pathname
  const isBid = useSignal(false)

  useTask$(async ({ track }) => {
    track(() => user.name)
    const bid = await server$(function () {
      return this.cookie.get("bid")?.value
    })()

    if (bid) isBid.value = true
    else isBid.value = false
  })

  return (
    <>
      <div class={`flex flex-column gap-10 p-5`}>
        <WelcomeMessage />
        <div>
          {isBid.value ? (
            <SignOutButtons />
          ) : (
            <div class={`flex gap-10  justify-end items-center`}>
              <ButtonStartAuth ctr={ctr} type={modalControl.code.SIGN_IN} locBeforeModal={loc} />
              <ButtonStartAuth ctr={ctr} type={modalControl.code.SIGN_UP} locBeforeModal={loc} />
            </div>
          )}
        </div>
      </div>
    </>
  )
})
