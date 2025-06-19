import { component$ } from "@builder.io/qwik"

export const IconArrowDown = component$(({ size = 24, fill = "#fff" }: { size?: number; fill?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={`${size}`} fill={`${fill}`}>
      <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
    </svg>
  )
})
