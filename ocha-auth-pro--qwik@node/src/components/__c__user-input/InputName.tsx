import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import style from "./internal/style.css?inline"
import { blurName, inputName } from "./internal"

export const InputName = component$(({ input }: { input: { value: string; fx: boolean } }) => {
  const timeoutId = useSignal(0)
  const helperMessage = useSignal("")

  const inputId = `input-${Math.random().toString(36).slice(2, 10)}`

  useStylesScoped$(style)

  return (
    <div class={`input-theme ${input.fx && `shake`}`}>
      <label for={inputId} class={`${input.value && "input-has-data"}`}>
        Name
      </label>
      <input
        id={inputId}
        type="text"
        value={input.value}
        required
        onInput$={(_, el: HTMLInputElement) => inputName(el, input, timeoutId, helperMessage)}
        onBlur$={(_, __: HTMLInputElement) => blurName(input, helperMessage)}
      />
      <div class="input-auth-helper">{helperMessage.value}</div>
    </div>
  )
})
