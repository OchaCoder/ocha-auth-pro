import { component$ } from "@builder.io/qwik"
import { IconArrowDown } from "~/components/__c_utils__svg"

export const DiagramArrow = component$(() => {
  return (
    <div class={`z-1 flex items-center justify-center`} style={{ height: "26px", width: "26px", borderRadius: "20px" }}>
      <IconArrowDown fill={`var(--color-dual-dark)`} />
    </div>
  )
})
