import { component$ } from "@builder.io/qwik"

export const IconSwapVert = component$(({ size = 24, fill = "#fff" }: { size?: number; fill?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={`${size}`} fill={`${fill}`}>
      <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z" />
    </svg>
  )
})
