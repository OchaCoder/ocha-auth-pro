import { component$ } from "@builder.io/qwik"

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

export const PlaceholderCards = component$(() => {
  return (
    <>
      {/* Placeholder cards - Keep `z-0`!! */}
      <div class={`z-0 flex justify-center`}>
        <div class={`placeholder-cards-wrap`}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} class="flex justify-center ">
              <div class="placeholder-card bg-dual-dark shadow-deep-light-bottom">{loremIpsum}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
})
