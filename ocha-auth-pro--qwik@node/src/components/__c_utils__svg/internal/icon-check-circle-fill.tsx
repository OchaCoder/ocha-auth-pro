import { component$ } from "@builder.io/qwik"

export const IconCheckCircleFill = component$(({ size = 24, fill = `var(--dual-dark)`, clip = `var(--dual-light)` }: { size?: number; fill?: string; clip?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" width={size} height={size}>
      <circle cx="480" cy="480" r="400" fill={fill} />
      <path d="M424 664l282-282-56-56-226 226-114-114-56 56 170 170Z" fill={clip} />
    </svg>
  )
})
