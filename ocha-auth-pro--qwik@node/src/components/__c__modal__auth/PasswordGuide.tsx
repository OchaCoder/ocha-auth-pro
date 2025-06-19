import { $, component$, useStore, useTask$ } from "@builder.io/qwik"
import { TbV } from "~/___typebox___/precompiled-validators"
import { IconCheckCircleFill } from "~/components/__c_utils__svg"

type PasswordHelperManager = {
  hasLength: boolean
  hasLetter: boolean
  hasNumber: boolean
  hasSpecial: boolean
}

export const checkPasswordRealTime = $((manager: PasswordHelperManager, input: string) => {
  const hasLength = input.length > 7
  const hasLetter = TbV.ui.hasLetter.Check(input)
  const hasNumber = TbV.ui.hasNumber.Check(input)
  const hasSpecial = TbV.ui.hasSpecialCharacter.Check(input)

  hasLength ? (manager.hasLength = true) : (manager.hasLength = false)
  hasLetter ? (manager.hasLetter = true) : (manager.hasLetter = false)
  hasNumber ? (manager.hasNumber = true) : (manager.hasNumber = false)
  hasSpecial ? (manager.hasSpecial = true) : (manager.hasSpecial = false)

  return hasLength && hasLetter && hasNumber && hasSpecial
})

export const PasswordGuide = component$(({ value }: { value: string }) => {
  const manager = useStore({
    hasLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false,
  })

  useTask$(({ track }) => {
    track(() => value)
    checkPasswordRealTime(manager, value)
  })

  return (
    <div class="grid" style={{ paddingTop: "20px", paddingLeft: "20px", gap: "5px" }}>
      <h3 class="font-size-9">Password must include:</h3>

      <div class="flex items-center font-size-9">
        <IconCheckCircleFill fill={`${manager.hasLength ? `var(--ok)` : `var(--gray)`}`} size={18} />
        At least 8 characters
      </div>
      <div class={`flex items-center font-size-9 `}>
        <IconCheckCircleFill fill={`${manager.hasLetter ? `var(--ok)` : `var(--gray)`}`} size={18} />
        At least one letter (A-Z, a-z)
      </div>
      <div class="flex items-center font-size-9">
        <IconCheckCircleFill fill={`${manager.hasNumber ? `var(--ok)` : `var(--gray)`}`} size={18} />
        At least one number (0-9)
      </div>
      <div class="flex items-center font-size-9">
        <IconCheckCircleFill fill={`${manager.hasSpecial ? `var(--ok)` : `var(--gray)`}`} size={18} />
        At least one special character (! @ # $ % & … )
      </div>
    </div>
  )
})
