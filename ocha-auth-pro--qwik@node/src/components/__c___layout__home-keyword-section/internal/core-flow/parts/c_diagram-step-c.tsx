import { component$ } from "@builder.io/qwik"

export const DiagramStepC = component$(({ step }: { step: string }) => {
  return (
    <div class={`z-1 flex nowrap overflow-hidden items-center`} style={{ borderRadius: "5px", border: "3px solid var(--strawberry)" }}>
      <span class={`p-tb-3 p-rl-5 color-strawberry weight-800`}>C</span>
      <span class={`p-tb-3 p-rl-5 color-dual-light bg-strawberry `}>{step}</span>
    </div>
  )
})
