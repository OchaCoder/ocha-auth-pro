import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { IconCloseSimple } from "~/components/__c_utils__svg/internal/icon-close-simple"
import { IconMenu } from "~/components/__c_utils__svg/internal/icon-menu"

export const CloseMobileMenuButton = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)

  /**
   * Rotates `IconMenu` for 200ms, then replaces it with `IconClose`.
   */
  const handleClickMenuButton = $(() => {
    ctr.mobileMenu.isRotating = true

    ctr.mobileMenu.isOpen = !ctr.mobileMenu.isOpen

    // Disables the scrollbar when the mobile menu is open.
    if (ctr.mobileMenu.isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "visible"

    setTimeout(() => {
      ctr.mobileMenu.isReplaced = !ctr.mobileMenu.isReplaced

      ctr.mobileMenu.isRotating = false
    }, 200)
  })

  useStylesScoped$(`
    .scoped {
        width: 30px;
        border-radius: 15px;
        margin-left: 0.7rem;
    }
  `)
  const utilClasses = `
          absolute left-0 flex justify-center 
          ${ctr.mobileMenu.isRotating && `spinner-fast`}
          cursor-pointer bg-dual-dark
          scoped
  `
  return (
    <>
      <div onClick$={() => handleClickMenuButton()} class={`flex items-center justify-center`}>
        {ctr.mobileMenu.isReplaced ? (
          <div class={utilClasses}>
            <IconCloseSimple size={28} fill={`var(--dual-light)`} />
          </div>
        ) : (
          <div class={utilClasses}>
            <IconMenu size={28} fill={`var(--dual-light)`} />
          </div>
        )}
      </div>
    </>
  )
})
