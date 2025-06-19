import { component$ } from "@builder.io/qwik"

export const DiagramStepB = component$(({ step }: { step: string }) => {
  return (
    <div class={`flex nowrap overflow-hidden items-center`} style={{ borderRadius: "5px", border: "3px solid var(--indigo)" }}>
      <span class={`p-tb-3 p-rl-5 color-indigo weight-800`}>B</span>
      <span class={`p-tb-3 p-rl-5 color-dual-light bg-indigo `}>{step}</span>
    </div>
  )
})
