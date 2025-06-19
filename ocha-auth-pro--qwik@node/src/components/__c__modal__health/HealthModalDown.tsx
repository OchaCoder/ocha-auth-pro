import { component$, useContext, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../___ctx___/context-global-state"
import { IconWarning } from "../../components/__c_utils__svg"
import style from "./internal/style.css?inline"

// Shows red alert when connection is down.
export const Down = component$(() => {
  useStylesScoped$(style)
  const { system } = useContext(ContextIdGlobalState)
  const showRedModal = useSignal(false)
  useTask$(({ track }) => {
    const isFastifyStable = track(() => system.health.isStable.fastify)
    const isInfraStable = track(() => system.health.isStable.infra)
    showRedModal.value = !isFastifyStable || !isInfraStable
  })

  const classes = `
          ${showRedModal.value ? `backend-down` : `hidden opacity-0 absolute`}
  `

  return (
    <div class={classes}>
      <div class={`flex items-center justify-center`} style={{ paddingBottom: "6px" }}>
        <div class={`icon-jiggle`}>
          <IconWarning size={30} />
        </div>

        <h2 class={`h2`} style={{ paddingLeft: "6px", fontWeight: 600, fontSize: "1.2rem", color: "white", borderBottom: "none" }}>
          Temporary connection issue
        </h2>
      </div>

      <div class={`grid color-white`} style={{ gap: "5px" }}>
        <div> Saving and updating are currently on a short break.</div>
        <div> We'll be back soon!</div>
      </div>
    </div>
  )
})
