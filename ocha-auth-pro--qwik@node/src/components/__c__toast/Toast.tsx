import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "~/___ctx___/context-global-state"
import { IconCheckCircle } from "../__c_utils__svg/internal/icon-check-circle"
import { IconWarning } from "../__c_utils__svg/internal/icon-warning"
import { IconCloseSimple } from "../__c_utils__svg/internal/icon-close-simple"

export const Toast = component$(() => {
  const { ctr } = useContext(ContextIdGlobalState)

  useStylesScoped$(`
      .scoped{
          width: 340px;
          height: 60px;
          display:grid;
          gird-auto-flow:row;
          grid-template-columns: 50px 1fr 30px;
          border-radius: 5px;
          animation: toastAnimation 7000ms ease-out forwards;
      }
      .toast-red {
        background-color: red;
      }
      .toast-yellow {
        background-color: #fd7310;
      }
      .toast-green {
        background-color: green;
      }
  `)

  return (
    <div class={`z-5 fixed flex flex-column gap-10`} style={{ bottom: "30px", right: "15px" }}>
      {ctr.toast.arr.map((t) => (
        <div key={t.id} class={`scoped toast-${t.type}`}>
          <div class={`flex justify-center`}>
            {t.type === "green" && <IconCheckCircle size={33} />}

            {(t.type === "red" || t.type === "yellow") && <IconWarning size={33} />}
          </div>

          <div class={`flex items-center color-dual-light`}>{t.txt}</div>

          <div
            class={`flex justify-center cursor-pointer`}
            onClick$={() => {
              // Remove one toast from the arr.
              ctr.toast.arr = ctr.toast.arr.filter((one) => t.id !== one.id)
            }}>
            <IconCloseSimple size={18} />
          </div>
        </div>
      ))}
    </div>
  )
})
