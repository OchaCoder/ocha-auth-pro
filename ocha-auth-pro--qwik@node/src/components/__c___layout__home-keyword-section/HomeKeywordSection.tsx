import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik"
import style from "./style.css?inline"
import { HomeKeywordModal } from "./HomeKeywordModal"
import type { ModalKeywordCode } from "./internal/modal-keyword-code"
import { modalKeywordCode } from "./internal/modal-keyword-code"

export const HomeKeywordSection = component$(() => {
  useStylesScoped$(style)

  const keywords = {
    coreFlow: [
      { title: "Sign-Up", code: modalKeywordCode.coreFlow.SIGN_UP },
      { title: "Password Reset via Email", code: modalKeywordCode.coreFlow.PASSWORD_RESET_VIA_EMAIL },
      { title: "Email Update", code: modalKeywordCode.coreFlow.EMAIL_UPDATE },
      { title: "Refresh AT via Proxy", code: modalKeywordCode.coreFlow.REFRESH_AT_VIA_PROXY },
      { title: "Sign Out (This Browser)", code: modalKeywordCode.coreFlow.SIGN_OUT_THIS_BROWSER },
      { title: "Sign Out (All Browsers)", code: modalKeywordCode.coreFlow.SIGN_OUT_ALL_BROWSER },
    ],
    architectureAndTools: [
      { title: "Argon2 over Bcrypt", code: modalKeywordCode.architectureAndTools.ARGON2_OVER_BCRYPT },
      { title: "Fastify", code: modalKeywordCode.architectureAndTools.FASTIFY },
      { title: "Paseto over JWT", code: modalKeywordCode.architectureAndTools.PASETO_OVER_JWT },
      { title: "PostgreSQL", code: modalKeywordCode.architectureAndTools.POSTGRESQL },
      { title: "Prometheus + Grafana", code: modalKeywordCode.architectureAndTools.PROMETHEUS_GRAFANA },
      { title: "Qwik", code: modalKeywordCode.architectureAndTools.QWIK },
      { title: "Redis", code: modalKeywordCode.architectureAndTools.REDIS },
      { title: "Secure Cookie Practices", code: modalKeywordCode.architectureAndTools.SECURE_COOKIE_PRACTICES },
      { title: "TypeBox", code: modalKeywordCode.architectureAndTools.TYPEBOX },
      { title: "WebSocket (vs SSE)", code: modalKeywordCode.architectureAndTools.WEBSOCKET_VS_SSE },
      { title: "Wretch", code: modalKeywordCode.architectureAndTools.WRETCH },
    ],
    designPhilosophyAndUx: [
      { title: "Backend Error Handling", code: modalKeywordCode.designPhilosophyAndUx.BACKEND_ERROR_HANDLING },
      { title: "Frontend Error Handling", code: modalKeywordCode.designPhilosophyAndUx.FRONTEND_ERROR_HANDLING },
      { title: "Oops vs Hmm", code: modalKeywordCode.designPhilosophyAndUx.OOPS_VS_HMM },
      { title: "Health Modal (Green and Red)", code: modalKeywordCode.designPhilosophyAndUx.HEALTH_MODAL },
      { title: "Server Redirect", code: modalKeywordCode.designPhilosophyAndUx.SERVER_REDIRECT },
      { title: "SameSite=Strict for Everything", code: modalKeywordCode.designPhilosophyAndUx.SAMESITE_STRICT_FOR_EVERYTHING },
      { title: "NO-CORS Policy", code: modalKeywordCode.designPhilosophyAndUx.NO_CORS_POLICY },
      { title: "Redirect Unintended Access", code: modalKeywordCode.designPhilosophyAndUx.REDIRECT_UNINTENDED_ACCESS },
      { title: "Single Front–Back Round Trip", code: modalKeywordCode.designPhilosophyAndUx.SINGLE_FRONT_BACK_ROUND_TRIP },
    ],
    whatProblemDoesItSolve: [
      { title: "Backend Access via Curl", code: modalKeywordCode.whatProblemDoesItSolve.BACKEND_ACCESS_VIA_CURL },
      { title: "Clickjacking", code: modalKeywordCode.whatProblemDoesItSolve.CLICKJACKING },
      { title: "CSRF", code: modalKeywordCode.whatProblemDoesItSolve.CSRF },
      { title: "CORS Drift", code: modalKeywordCode.whatProblemDoesItSolve.CORS_DRIFT },
      { title: "Leaky Client Code", code: modalKeywordCode.whatProblemDoesItSolve.LEAKY_CLIENT_CODE },
      { title: "Token Theft + Token Forgery", code: modalKeywordCode.whatProblemDoesItSolve.TOKEN_THEFT },
      { title: "Email Enumeration Brute Force", code: modalKeywordCode.whatProblemDoesItSolve.EMAIL_ENUMARATION_BRUTE_FORCE },
      { title: "Token Desync Across Tabs", code: modalKeywordCode.whatProblemDoesItSolve.TOKEN_DESYNC_ACROSS_TABS },
      { title: "HTTP Flooding + DDoS", code: modalKeywordCode.whatProblemDoesItSolve.HTTP_FLOODING_DDOS },
    ],
  }

  const code = useSignal<ModalKeywordCode | null>(null)
  return (
    <>
      <HomeKeywordModal code={code} />
      <section>
        <h2 class={`h2 font-size-20`}>Get to know Ocha🍵</h2>
        <div class={`p-rl-10 flex flex-column gap-10`}>
          <p>What is brewing under Ocha-Auth Pro?🧐🧐🧐</p>
          <p>Click a keyword and see what the fuss is all about!🌱</p>
        </div>

        <div class={`p-10`}>
          <h3 class={`font-size-18 color-gray p-tb-10`}>Core Flows</h3>
          <div class={`flex gap-15`} style={{ flexWrap: "wrap" }}>
            {keywords.coreFlow.map((k) => (
              <div class={`keyword-box`} onClick$={() => (code.value = k.code)} key={k.title}>
                {k.title}
              </div>
            ))}
          </div>
        </div>

        <div class={`p-10`}>
          <h3 class={`font-size-18 color-gray p-tb-10`}>Architecture & Tech Stacks</h3>
          <div class={`flex gap-15`} style={{ flexWrap: "wrap" }}>
            {keywords.architectureAndTools.map((k) => (
              <div class={`keyword-box`} onClick$={() => (code.value = k.code)} key={k.title}>
                {k.title}
              </div>
            ))}
          </div>
        </div>

        <div class={`p-10`}>
          <h3 class={`font-size-18 color-gray p-tb-10`}>Design Philosophy & UX</h3>
          <div class={`flex gap-15`} style={{ flexWrap: "wrap" }}>
            {keywords.designPhilosophyAndUx.map((k) => (
              <div class={`keyword-box`} onClick$={() => (code.value = k.code)} key={k.title}>
                {k.title}
              </div>
            ))}
          </div>
        </div>

        <div class={`p-10`}>
          <h3 class={`font-size-18 color-gray p-tb-10`}>What problem does it solve?</h3>
          <div class={`flex gap-15`} style={{ flexWrap: "wrap" }}>
            {keywords.whatProblemDoesItSolve.map((k) => (
              <div class={`keyword-box`} onClick$={() => (code.value = k.code)} key={k.title}>
                {k.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
})
