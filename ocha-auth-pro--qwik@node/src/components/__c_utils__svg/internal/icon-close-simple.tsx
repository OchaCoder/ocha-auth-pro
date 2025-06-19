import { component$ } from "@builder.io/qwik"

export const IconCloseSimple = component$(({ size = 24, fill = "#fff" }: { size?: number; fill?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={`${size}`} fill={`${fill}`}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  )
})
