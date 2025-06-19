import { component$ } from "@builder.io/qwik"
import { SubMenuItem } from "./_c_sub-menu-item"

export const SubMenuItems = component$(() => {
  const page = {
    demo: { title: "live demo", path: `/` },
    monitor: { title: "grafana", path: `/grafana/` },
    speed: { title: "speed test", path: `/speed-test/` },
    github: { title: "github", path: "/github/" },
  }

  return (
    <>
      {/* Sub menu items */}
      <div class={`flex justify-center w-100 p-4 border-light-top`}>
        <div class={`flex justify-between grow`} style={{ maxWidth: "800px" }}>
          <SubMenuItem page={page.demo} />
          <SubMenuItem page={page.monitor} />
          <SubMenuItem page={page.speed} />
          <SubMenuItem page={page.github} />
        </div>
      </div>
    </>
  )
})
