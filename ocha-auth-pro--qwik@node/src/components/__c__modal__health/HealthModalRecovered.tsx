import { component$, useContext, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { IconCheckCircle } from "~/components/__c_utils__svg"
import style from "./internal/style.css?inline"

// Shows green alert when connection is back.
export const Recovered = component$(() => {
  useStylesScoped$(style)

  const { system } = useContext(ContextIdGlobalState)
  const showGreenModal = useSignal(false)
  useTask$(({ track }) => {
    const isFastifyStable = track(() => system.health.isStable.fastify)
    const isInfraStable = track(() => system.health.isStable.infra)
    showGreenModal.value = isFastifyStable && isInfraStable && system.health.showModal.isInitialLoad !== 0

    setTimeout(() => {
      showGreenModal.value = false
    }, 3500)
  })

  const classes = `
      ${showGreenModal.value ? `backend-recovered` : `opacity-0 hidden absolute`}
      `

  return (
    <div class={classes}>
      <div class={`flex items-center justify-center`}>
        <IconCheckCircle size={28} />
        <h3 style={{ paddingLeft: "6px", fontWeight: 600, fontSize: "1.3rem", color: "white" }}>Connection is back up!</h3>
      </div>
    </div>
  )
})
