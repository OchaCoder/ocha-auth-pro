import { component$ } from "@builder.io/qwik"

export const DashboardEditEmail = component$(({ email }: { email: string }) => {
  return (
    <>
      <h4 class="p-b-10">
        <span class="font-size-13">{email}</span>
        <span class="weight-200 font-size-11 p-rl-5">-</span>
        <span class="weight-200 font-size-11 color-theme-sub">Current Email</span>
      </h4>
      <div class={`p-8`}>
        <p>
          An <span class={`italic weight-800`}>email</span> is an essential part of the user authentication flow, and should be handled with care.
        </p>
        <p>A threat includes it being registered to a foreign account, unaware of the owner's knowledge.</p>
        <p>Although less likely to be an immediate damage, it is a risk and should be avoided none the less.</p>
        <p>
          In this demo, we'll follow the <span class={`weight-800`}>email confirmation</span> practice before updating it.
        </p>
      </div>

      <h4 class="font-size-10 p-tb-5">Edit Name</h4>
    </>
  )
})
