import { component$ } from "@builder.io/qwik"

export const IconPlus = component$(({ size = 24, fill = "#fff" }: { size?: number; fill?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={`${size}`} fill={`${fill}`}>
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  )
})
