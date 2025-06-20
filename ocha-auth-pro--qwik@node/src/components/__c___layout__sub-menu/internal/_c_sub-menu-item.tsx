import { component$, useStylesScoped$ } from "@builder.io/qwik"
import { useLocation } from "@builder.io/qwik-city"

export const SubMenuItem = component$(({ page }: { page: { title: string; path: string } }) => {
  const loc = useLocation().url.pathname

  useStylesScoped$(`
      .scoped{
        transition:
            background-color ease-out 400ms,
            color ease-out 400ms;
      }
  `)

  const utilClasses = `
            font-size-11 cursor-pointer p-rl-5 skew 
            color-white hover-color-theme  
            ${loc === page.path && `bg-black `}
            scoped
            `
  return (
    <>
      <div class={utilClasses}>
        <a href={page.path} class={`no-underline`}>
          {page.title}
        </a>
      </div>
    </>
  )
})
