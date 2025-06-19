import { component$, Slot } from "@builder.io/qwik"

export const DashboardSectionSlot = component$(({ title }: { title: string }) => {
  return (
    <>
      <div class={`weight-200 font-size-16  flex items-center p-5`} style={{ marginBottom: "5px", borderBottom: `solid 1px var(--gray)` }}>
        {/* <div class={`weight-200 font-size-14 bg-theme-sub color-dual-light flex items-center p-5`} style={{ marginBottom: "10px" }}> */}
        {title}
      </div>
      <div style={{ padding: "5px" }}>
        <div class={`w-100 p-10 border-gray`} style={{ borderRadius: `10px` }}>
          <Slot />
        </div>
      </div>
    </>
  )
})
