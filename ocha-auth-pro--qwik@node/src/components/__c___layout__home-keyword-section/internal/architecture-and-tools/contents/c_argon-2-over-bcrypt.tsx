import { component$ } from "@builder.io/qwik"
import { IconArrowRight } from "~/components/__c_utils__svg"

export const Argon2OverBycrypt = component$(() => {
  return (
    <>
      <div class={`flex-column justify-start p-10`} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Argon2 Over Bcrypt</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            In OchaAuthPro, <span class={`color-theme-sub`}>Argon2</span> is used instead of the more widely known <span class={`color-theme-sub`}>bcrypt</span> to hash user passwords before storing
            them in the database.
          </p>
          <p>
            <span class={`color-theme-sub weight-800`}>Argon2</span> is a password-hashing algorithm that won the Password Hashing Competition (PHC) in 2015.
          </p>
          <p>
            It’s designed to be secure <span class={`italic weight-800`}>today</span>—not 20 years ago.
          </p>
        </section>

        <section class={`p-tb-10`}>
          <div class={`flex flex-column gap-10 p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Resistant to GPU/ASIC attacks</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`} style={{ height: "20px" }}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Thanks to its memory-hard design</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Modern defaults</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`} style={{ height: "20px" }}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Unlike bcrypt’s 72-character input limit and outdated cost mechanism</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Better future-proofing</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`} style={{ height: "20px" }}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Especially as hardware gets faster and attacks become cheaper</span>
              </div>
            </div>

            <div class={`p-5`}>
              <div class={`color-theme-sub`}>Tunability</div>
              <div class={`flex items-center`}>
                <div class={`p-r-5`} style={{ height: "20px" }}>
                  <IconArrowRight size={20} fill={`var(--dual-dark)`} />
                </div>
                <span>Control over memory, CPU time, and parallelism per use case</span>
              </div>
            </div>
          </div>
        </section>

        <section class={`p-tb-10`}>
          <h2 class={`color-theme-sub weight-800 p-tb-5`}>Real-world impact</h2>
          <p>Even if a user has a weak password, Argon2 adds a meaningful layer of protection against brute-force and rainbow table attacks.</p>
        </section>
      </div>
    </>
  )
})
