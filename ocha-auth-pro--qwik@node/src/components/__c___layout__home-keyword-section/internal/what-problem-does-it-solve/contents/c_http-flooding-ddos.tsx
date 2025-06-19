import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"

export const HttpFloodingDdos = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column items-start
              p-10
              ${code === modalKeywordCode.whatProblemDoesItSolve.HTTP_FLOODING_DDOS ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
      <section class={`flex flex-column gap-15 p-tb-10`}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>HTTP Flooding / DDoS</h1>

        <p>OchaAuthPro is not designed as a DDoS-hardened application—but it’s built with awareness of the risks and extensibility in mind.</p>

        <p>
          <span class={`weight-800`}>
            Our internal error system includes a dedicated <code class={`code`}>ErrorSuspiciousActivity</code> class
          </span>{" "}
          for capturing potentially malicious behavior—along with relevant metadata like IP address and browser fingerprint.
        </p>

        <p>This foundation makes it easier to integrate downstream tools like Prometheus, Grafana, or a WAF (Web Application Firewall) in a structured and meaningful way.</p>

        <p>We’re also open to exploring smart strategies like:</p>

        <div class={`p-10`} style={{ border: "1px solid var(--theme-sub)", borderRadius: "5px" }}>
          <ul class={`p-10 flex flex-column gap-15`}>
            <li>Rate-limiting by IP or browser ID</li>
            <li>Temporary blacklisting of high-volume attackers</li>
            <li>Emergency-mode filters that allow access only to signed-in users with a special cookie</li>
            <li>Layer-7 mitigations via NGINX or similar reverse proxies</li>
          </ul>
        </div>

        <p>
          <span class={`weight-800`}>In short:</span> while this showcase project doesn’t actively defend against large-scale flooding attacks, it’s already structured with observability and reaction
          in mind—and leaves the door open for deeper protection if needed.
        </p>
      </section>
    </div>
  )
})
