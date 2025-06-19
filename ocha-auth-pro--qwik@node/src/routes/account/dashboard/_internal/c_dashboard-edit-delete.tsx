import { component$ } from "@builder.io/qwik"

export const DashboardEditDelete = component$(() => {
  return (
    <>
      <div class={`p-8`}>
        <p>You can proceed to deleting your account by pressing the button below.</p>
        <p>A confirmation dialogue will pop out, and if you agree, your account will be completely erased from our database.</p>
        <p>If you feel like testing this demo app again after deletion, just create a new account and start fresh!</p>
      </div>
    </>
  )
})
