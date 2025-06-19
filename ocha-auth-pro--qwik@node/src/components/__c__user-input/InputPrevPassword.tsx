import { component$, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik"
import { IconVisibility, IconVisibilityOff } from "../__c_utils__svg"
import style from "./internal/style.css?inline"
import { blurPrevPassword, inputPrevPassword } from "./internal"

export const InputPrevPassword = component$(
  ({
    input,
  }: {
    input: {
      value: string
      fx: boolean
      isVisible: boolean
    }
  }) => {
    const timeoutId = useSignal(0)
    const helperMessage = useSignal("")

    useTask$(() => {
      // Reset store values. Track something! modal code?
      input.value = ""
      timeoutId.value = 0
      helperMessage.value = ""
    })

    useStylesScoped$(style)

    // Ensure each instance has unique id
    const inputId = `input-${Math.random().toString(36).slice(2, 10)}`

    return (
      <div class={`input-theme ${input.fx && `shake`}`}>
        <label for={inputId} class={input.value && "input-has-data"}>
          Old Password
        </label>

        <input
          id={inputId}
          type={input.isVisible ? "text" : "password"}
          value={input.value}
          required
          onInput$={async (_, el: HTMLInputElement) => {
            inputPrevPassword(el, input, timeoutId, helperMessage)
          }}
          onBlur$={() => {
            blurPrevPassword(input, helperMessage)
          }}
        />

        <div class="auth-input-visible" onClick$={() => (input.isVisible = !input.isVisible)}>
          {input.isVisible ? <IconVisibility fill={`var(--theme-sub)`} /> : <IconVisibilityOff fill={`var(--theme-sub)`} />}
        </div>

        <div class="input-auth-helper">{helperMessage.value}</div>
      </div>
    )
  }
)
