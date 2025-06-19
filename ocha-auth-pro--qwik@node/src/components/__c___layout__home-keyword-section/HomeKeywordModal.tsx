import type { Signal } from "@builder.io/qwik"
import { component$ } from "@builder.io/qwik"
import { ModalKeywordCloseButton, ModalKeywordOverlay, ModalKeywordShell } from "./internal"
import { Argon2OverBycrypt, Fastify, PasetoOverJwt, Postgresql, PrometheusGrafana, Qwik, Redis, SecureCookiePractices, Typebox, WebsocketVsSse, Wretch } from "./internal/architecture-and-tools"
import { FlowEmailUpdate, FlowPasswordResetViaEmail, FlowRefreshAtViaProxy, FlowSignOutAllBrowser, FlowSignOutThisBrowser, FlowSignUp } from "./internal/core-flow"
import {
  BackendErrorHandling,
  FrontendErrorHandling,
  HealthModalGreenAndRed,
  NoCorsPolicy,
  OopsVsHmm,
  RedirectUnintendedAccess,
  SamesiteStrictForEverything,
  ServerRedirect,
  SingleFrontBackRoundTrip,
} from "./internal/design-philosophy-and-ux"
import {
  BackendAccessViaCurl,
  Clickjacking,
  CorsDrift,
  Csrf,
  EmailEnumeratioinBruteForce,
  HttpFloodingDdos,
  LeakyClientCode,
  TokenDesyncAcrossTabs,
  TokenTheftTokenForgery,
} from "./internal/what-problem-does-it-solve"
import { ModalKeywordCode, modalKeywordCode } from "./internal/modal-keyword-code"

export const HomeKeywordModal = component$(({ code }: { code: Signal }) => {
  const currentCode = code.value as ModalKeywordCode
  const contentMap = {
    /* Architecture And Tools */
    [modalKeywordCode.architectureAndTools.ARGON2_OVER_BCRYPT]: <Argon2OverBycrypt />,
    [modalKeywordCode.architectureAndTools.FASTIFY]: <Fastify code={code.value} />,
    [modalKeywordCode.architectureAndTools.PASETO_OVER_JWT]: <PasetoOverJwt code={code.value} />,
    [modalKeywordCode.architectureAndTools.POSTGRESQL]: <Postgresql code={code.value} />,
    [modalKeywordCode.architectureAndTools.PROMETHEUS_GRAFANA]: <PrometheusGrafana code={code.value} />,
    [modalKeywordCode.architectureAndTools.QWIK]: <Qwik code={code.value} />,
    [modalKeywordCode.architectureAndTools.REDIS]: <Redis code={code.value} />,
    [modalKeywordCode.architectureAndTools.SECURE_COOKIE_PRACTICES]: <SecureCookiePractices code={code.value} />,
    [modalKeywordCode.architectureAndTools.TYPEBOX]: <Typebox code={code.value} />,
    [modalKeywordCode.architectureAndTools.WEBSOCKET_VS_SSE]: <WebsocketVsSse code={code.value} />,
    [modalKeywordCode.architectureAndTools.WRETCH]: <Wretch code={code.value} />,
    /* Core Flow */
    [modalKeywordCode.coreFlow.EMAIL_UPDATE]: <FlowEmailUpdate code={code.value} />,
    [modalKeywordCode.coreFlow.PASSWORD_RESET_VIA_EMAIL]: <FlowPasswordResetViaEmail code={code.value} />,
    [modalKeywordCode.coreFlow.REFRESH_AT_VIA_PROXY]: <FlowRefreshAtViaProxy code={code.value} />,
    [modalKeywordCode.coreFlow.SIGN_OUT_ALL_BROWSER]: <FlowSignOutAllBrowser code={code.value} />,
    [modalKeywordCode.coreFlow.SIGN_OUT_THIS_BROWSER]: <FlowSignOutThisBrowser code={code.value} />,
    [modalKeywordCode.coreFlow.SIGN_UP]: <FlowSignUp code={code.value} />,
    /* Design Philosophy And Ux */
    [modalKeywordCode.designPhilosophyAndUx.BACKEND_ERROR_HANDLING]: <BackendErrorHandling code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.FRONTEND_ERROR_HANDLING]: <FrontendErrorHandling code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.HEALTH_MODAL]: <HealthModalGreenAndRed code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.NO_CORS_POLICY]: <NoCorsPolicy code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.OOPS_VS_HMM]: <OopsVsHmm code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.REDIRECT_UNINTENDED_ACCESS]: <RedirectUnintendedAccess code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.SAMESITE_STRICT_FOR_EVERYTHING]: <SamesiteStrictForEverything code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.SERVER_REDIRECT]: <ServerRedirect code={code.value} />,
    [modalKeywordCode.designPhilosophyAndUx.SINGLE_FRONT_BACK_ROUND_TRIP]: <SingleFrontBackRoundTrip code={code.value} />,
    /* What Problem Does It Solve? */
    [modalKeywordCode.whatProblemDoesItSolve.BACKEND_ACCESS_VIA_CURL]: <BackendAccessViaCurl code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.CLICKJACKING]: <Clickjacking code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.CORS_DRIFT]: <CorsDrift code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.CSRF]: <Csrf code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.EMAIL_ENUMARATION_BRUTE_FORCE]: <EmailEnumeratioinBruteForce code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.HTTP_FLOODING_DDOS]: <HttpFloodingDdos code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.LEAKY_CLIENT_CODE]: <LeakyClientCode code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.TOKEN_DESYNC_ACROSS_TABS]: <TokenDesyncAcrossTabs code={code.value} />,
    [modalKeywordCode.whatProblemDoesItSolve.TOKEN_THEFT]: <TokenTheftTokenForgery code={code.value} />,
  }

  const TargetContent = contentMap[currentCode]
  return (
    <>
      <ModalKeywordOverlay code={code} />
      <ModalKeywordShell code={code.value}>
        <ModalKeywordCloseButton code={code} />
        {TargetContent ?? null}
      </ModalKeywordShell>
    </>
  )
})
