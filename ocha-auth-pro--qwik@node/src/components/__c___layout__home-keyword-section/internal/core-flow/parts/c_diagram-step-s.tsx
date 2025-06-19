import { component$ } from "@builder.io/qwik"

export const DiagramStepS = component$(({ step }: { step: string }) => {
  return (
    <div class={`flex nowrap overflow-hidden items-center`} style={{ borderRadius: "5px", border: "3px solid var(--teal)" }}>
      <span class={`p-tb-3 p-rl-5 color-teal weight-800`}>S</span>
      <span class={`p-tb-3 p-rl-5 color-dual-light bg-teal `}>{step}</span>
    </div>
  )
})
