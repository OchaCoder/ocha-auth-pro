import { component$ } from "@builder.io/qwik"

export const IconKeyboardArrowDown = component$(({ size = 24, fill = "#fff" }: { size?: number; fill?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={`${size}`} fill={`${fill}`}>
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  )
})
