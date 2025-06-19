import { component$ } from "@builder.io/qwik"
import { DiagramStepC } from "../../../../__c___layout__home-keyword-section/internal/core-flow/parts/c_diagram-step-c"
import { DiagramArrow } from "../../../../__c___layout__home-keyword-section/internal/core-flow/parts/c_diagram-arrow"
import { DiagramStepS } from "../../../../__c___layout__home-keyword-section/internal/core-flow/parts/c_diagram-step-s"
import { DiagramStepB } from "../../../../__c___layout__home-keyword-section/internal/core-flow/parts/c_diagram-step-b"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const FlowSignUp = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
        flex-column justify-start
        p-10
        ${code === modalKeywordCode.coreFlow.SIGN_UP ? `flex visible opacity-1` : `none hidden opacity-0`}
        `
  return (
    <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
      <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Sign-Up Flow</h1>
      <p class="font-size-13 color-gray p-b-5">A simplified view of how new users register.</p>

      <section class={`p-tb-5`}>
        <details class={`p-10`} style={{ border: "2px solid var(--theme-sub)", borderRadius: "5px" }}>
          <summary class={`cursor-pointer`}>
            {`What does `}
            <span class={`weight-800 color-strawberry`}>C</span>
            {` / `}
            <span class={`weight-800 color-teal`}>S</span>
            {` / `}
            <span class={`weight-800 color-indigo`}>B</span>
            {` mean?`}
          </summary>
          <p class={`p-t-5`}>
            <span class={`weight-800 color-strawberry`}>C</span> = Client-side (Frontend)
            <br />
            <span class={`weight-800 color-teal`}>S</span> = Server-side (Frontend)
            <br />
            <span class={`weight-800 color-indigo`}>B</span> = Backend
          </p>
        </details>
        <div class={`relative`}>
          <div class="flow-line"></div>
          <div class={`flex flex-column p-tb-10 gap-10 items-center`} style={{ flexWrap: "wrap" }}>
            <DiagramStepC step={`User Input`} />
            <DiagramArrow />
            <DiagramStepC step={`Validate Input`} />
            <DiagramArrow />
            <DiagramStepS step={`Send Request 1`} />
            <DiagramArrow />
            <DiagramStepB step={`Validate Payload`} />
            <DiagramArrow />
            <DiagramStepB step={`Unique User Check`} />
            <DiagramArrow />
            <DiagramStepB step={`Send Email`} />
            <DiagramArrow />
            <DiagramStepS step={`Token Format Check`} />
            <DiagramArrow />
            <DiagramStepS step={`Send Request 2`} />
            <DiagramArrow />
            <DiagramStepB step={`Verify Token`} />
            <DiagramArrow />
            <DiagramStepB step={`Store New User`} />
            <DiagramArrow />
            <DiagramStepB step={`Send Reply`} />
            <DiagramArrow />
            <DiagramStepS step={`Server Redirect`} />
            <DiagramStepS step={`Validate Reply`} />
            <DiagramArrow />
            <DiagramStepC step={`Handle Success/Error`} />
          </div>
        </div>
      </section>
    </div>
  )
})
