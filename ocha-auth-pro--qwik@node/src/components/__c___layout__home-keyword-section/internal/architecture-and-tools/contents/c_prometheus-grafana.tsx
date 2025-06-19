import { component$ } from "@builder.io/qwik"
import type { ModalKeywordCode } from "../../modal-keyword-code"
import { modalKeywordCode } from "../../modal-keyword-code"
import { Link } from "@builder.io/qwik-city"

export const PrometheusGrafana = component$(({ code }: { code: ModalKeywordCode }) => {
  const classes = `
              flex-column justify-start
              p-10
              ${code === modalKeywordCode.architectureAndTools.PROMETHEUS_GRAFANA ? `flex visible opacity-1` : `none hidden opacity-0`}
              `
  return (
    <>
      <div class={classes} style={{ paddingTop: "45px", paddingBottom: "45px" }}>
        <h1 class={`font-size-18 color-theme-sub p-tb-5`}>Prometheus + Grafana</h1>

        <section class={`flex flex-column gap-15 p-tb-10`}>
          <p>
            Before reaching for external tools, OchaAuthPro started with a hand-rolled health check system for Redis and Postgres. It tracked availability in real time using `setTimeout` intervals and
            latency measurements, with output piped into colorful logs using <code class={`code`}>chalk</code>.
          </p>
          <p>
            While this cozy system was enough to catch issues during development, I knew that real observability required real tooling. So instead of stopping halfway, I integrated{" "}
            <span class={`color-theme-sub weight-800`}>Prometheus</span> and <span class={`color-theme-sub weight-800`}>Grafana</span> for proper infrastructure monitoring.
          </p>
          <p>
            The health state of Redis, Postgres, and the monitoring uptime are now exposed as a Prometheus-compatible metrics endpoint. Each value is scraped at regular intervals and visualized
            through Grafana dashboards, giving live insight into the system’s heartbeat.
          </p>
          <p>
            For this demo, both <span class={`color-theme-sub weight-800`}>Prometheus and Grafana are self-hosted on a VPS</span>, using{" "}
            <span class={`color-theme-sub weight-800`}>Docker Compose</span>.
          </p>
          <p>
            You can check my Grafana Dashboard from <Link href={`https://grafana.ochacoder.com/public-dashboards/27e18136f6b340f9a5e7ca6d28d9d163`}>here</Link>.
          </p>
        </section>
      </div>
    </>
  )
})
