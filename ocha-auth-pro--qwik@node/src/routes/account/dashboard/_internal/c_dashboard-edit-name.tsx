import { component$ } from "@builder.io/qwik"

export const DashboardEditName = component$(({ name }: { name: string }) => {
  return (
    <>
      <h4 class="p-b-10">
        <span class="font-size-13">{name}</span>
        <span class="weight-200 font-size-11 p-rl-5">-</span>
        <span class="weight-200 font-size-11 color-theme-sub">Current User Name</span>
      </h4>
      <div class={`p-8`}>
        <p>
          A <span class={`italic weight-800`}>user name</span> represents you publicly without exposing your real-world indentity - like your email.
        </p>
        <p>It also doesn't have to be uniquely yours, because behind the scenes, it won't be involved in any operational logic.</p>
        <p>For this, a userID, and occasionally an email is used when appropriate.</p>
        <p>
          In this demo app, a user name should be <span class="weight-800">between 2 and 50 characters</span>.
        </p>
        <p>Feel free to pick any name!</p>
      </div>

      <h4 class="font-size-10 p-tb-5">Edit Name</h4>
    </>
  )
})
