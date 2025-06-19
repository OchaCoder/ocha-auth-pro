import { component$, isBrowser, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik"
import { matchPassword } from "~/___fn___/__f___input-test/match-password"
import style from "./internal/style.css?inline"
import { IconVisibility, IconVisibilityOff } from "../__c_utils__svg"
import { blurPasswordConfirm } from "./internal"

export const InputPasswordConfirm = component$(
  ({
    input,
  }: {
    input: {
      value: string
      valueConfirm: string
      fx: boolean
      isVisible: boolean
      testType: "full"
    }
  }) => {
    const timeoutId = useSignal(0)
    const helperMessage = useSignal("")

    useTask$(({ track }) => {
      // Track changes in both `InputPassword` and `InputPasswordPassword`
      track(() => input.value)
      track(() => input.valueConfirm)

      if (!isBrowser) return

      clearTimeout(timeoutId.value)

      helperMessage.value = ""

      if (input.valueConfirm === "") return

      const { success, message } = matchPassword(input.value, input.valueConfirm)

      if (success) return
      else timeoutId.value = window.setTimeout(() => (helperMessage.value = message[0]), 1400)
    })

    useStylesScoped$(style)

    const inputId = `input-${Math.random().toString(36).slice(2, 10)}`

    return (
      <div class={`input-theme ${input.fx && `shake`}`}>
        <label for={inputId} class={input.valueConfirm && "input-has-data"}>
          Confirm password
        </label>
        <input
          id={inputId}
          type={input.isVisible ? "text" : "password"}
          value={input.valueConfirm}
          required
          onInput$={(_, el: HTMLInputElement) => (input.valueConfirm = el.value)}
          onBlur$={() => {
            blurPasswordConfirm(input, helperMessage)
          }}
        />

        {/* Clickable Eye Icon */}
        <div class="auth-input-visible" onClick$={() => (input.isVisible = !input.isVisible)}>
          {input.isVisible ? <IconVisibility fill={`var(--theme-sub)`} /> : <IconVisibilityOff fill={`var(--theme-sub)`} />}
        </div>

        {/* Helper Text */}
        <div class="input-auth-helper">{helperMessage.value}</div>
      </div>
    )
  }
)
