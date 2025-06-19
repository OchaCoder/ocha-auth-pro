import { component$ } from "@builder.io/qwik"
import { SubMenuLogoList } from "./internal/_c_sub-menu-logo-list"
import { SubMenuItems } from "./internal/_c_sub-menu-items"
import { Link } from "@builder.io/qwik-city"

/**
 *
 * @argument title: The title of the project (e.g. Ocha-Auth)
 * @argument bg: The CSS class for the background-color (e.g. bg-theme-ocha-auth)
 * @argument theme: The CSS variable of this project's theme color (e.g. var(--theme-ocha-auth))
 * @argument url: An object of the urls of this project. (e.g. { demo: string; flyer: string; readme: string; debug: string })
 *
 */
export const SubMenu = component$(() => {
  return (
    <>
      <div class={`bg-theme-sub color-dual-light`}>
        <div class={`flex justify-between items-center overflow-hidden `}>
          <Link href={"/"} class={`skew absolute cursor-pointer no-underline font-size-25`} style={{ paddingLeft: "3px" }}>
            Ocha-Auth Pro
          </Link>
          <SubMenuLogoList />
        </div>
        <SubMenuItems />
      </div>
    </>
  )
})
