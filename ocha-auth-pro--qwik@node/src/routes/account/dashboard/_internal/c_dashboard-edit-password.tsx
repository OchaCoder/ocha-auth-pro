import { component$ } from "@builder.io/qwik"

export const DashboardEditPassword = component$(() => {
  return (
    <>
      <div class={`p-8`}>
        <p>
          To update your current <span class={`italic color-theme-sub`}>password</span>, you must first enter your old one.
        </p>
        <p>
          This flow is often called <span class={`weight-800`}>step-up authentication</span> and falls under the umbrella of <span class={`weight-800`}>defense-in-depth</span> and{" "}
          <span class={`weight-800`}>session hardening</span> in security best practices.
        </p>
        <p>
          While signing in proves you <span class={`weight-800`}>possess</span> a valid token or cookie, high-risk actions like changing your password should also require{" "}
          <span class={`weight-800`}>knowledge</span> — something only the true user knows. A session alone isn’t always enough to prove your presence or consent.
        </p>
        <p>Just in case your session is hijacked or left open on a shared device, this extra step helps ensure it’s really you!</p>
      </div>
    </>
  )
})
