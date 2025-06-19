import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { LogoQwikMarkOnly } from "../../__c_utils__svg/internal/logo-qwik-mark-only"
import { LogoFastifyMarkOnly } from "../../__c_utils__svg/internal/logo-fastify-mark-only"

export const SubMenuLogoList = component$(() => {
  const utilClasses = `flex items-center logo-holder-circle cursor-pointer`

  return (
    <>
      {/* Powered by... section */}
      <div class={`w-100 flex items-center justify-end p-tb-3 p-r-5`}>
        <div class={`font-size-9 italic text-center`}>Made of: </div>

        <Link href={`https://qwik.dev/`} class={utilClasses} style={{ marginLeft: "5px" }}>
          <LogoQwikMarkOnly size={2.4} />
        </Link>

        <Link href={`https://fastify.dev/`} class={utilClasses} style={{ marginLeft: "5px" }}>
          <LogoFastifyMarkOnly size={1.8} fill={`var(--theme-sub)`} />
        </Link>
      </div>
    </>
  )
})
