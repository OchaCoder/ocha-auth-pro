import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import style from "./internal/style.css?inline"
import { blurEmail, inputEmail } from "./internal"

export const InputEmail = component$(({ input }: { input: { value: string; fx: boolean; testType: "full" | "empty" } }) => {
  const timeoutId = useSignal(0)
  const helperMessage = useSignal("")

  const inputId = `input-${Math.random().toString(36).slice(2, 10)}`

  useStylesScoped$(style)

  return (
    <div class={`input-theme ${input.fx && `shake`}`}>
      <label for={inputId} class={input.value && "input-has-data"}>
        Email
      </label>
      <input
        id={inputId}
        type="email"
        value={input.value}
        required
        onInput$={(_, el: HTMLInputElement) => {
          inputEmail(el, input, timeoutId, helperMessage)
        }}
        onBlur$={() => {
          blurEmail(input, helperMessage)
        }}
      />
      <div class="input-auth-helper">{helperMessage.value}</div>
    </div>
  )
})
