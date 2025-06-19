import { component$ } from "@builder.io/qwik"

export const Footer = component$(() => {
  return (
    <>
      <div class={`grid w-100 p-5 bg-theme-sub font-size-9 italic`}>
        <p>Copyright 2025 ochacoder.com</p>
      </div>
    </>
  )
})
