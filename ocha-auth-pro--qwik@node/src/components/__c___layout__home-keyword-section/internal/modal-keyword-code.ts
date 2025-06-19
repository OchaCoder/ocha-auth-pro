export const modalKeywordCode = {
  architectureAndTools: {
    ARGON2_OVER_BCRYPT: "ARGON2_OVER_BCRYPT" as const,
    FASTIFY: "FASTIFY" as const,
    PASETO_OVER_JWT: "PASETO_OVER_JWT" as const,
    POSTGRESQL: "POSTGRESQL" as const,
    PROMETHEUS_GRAFANA: "PROMETHEUS_GRAFANA" as const,
    QWIK: "QWIK" as const,
    REDIS: "REDIS" as const,
    SECURE_COOKIE_PRACTICES: "SECURE_COOKIE_PRACTICES" as const,
    TYPEBOX: "TYPEBOX" as const,
    WEBSOCKET_VS_SSE: "WEBSOCKET_VS_SSE" as const,
    WRETCH: "WRETCH" as const,
  },
  coreFlow: {
    EMAIL_UPDATE: "EMAIL_UPDATE" as const,
    PASSWORD_RESET_VIA_EMAIL: "PASSWORD_RESET_VIA_EMAIL" as const,
    REFRESH_AT_VIA_PROXY: "REFRESH_AT_VIA_PROXY" as const,
    SIGN_OUT_ALL_BROWSER: "SIGN_OUT_ALL_BROWSER" as const,
    SIGN_OUT_THIS_BROWSER: "SIGN_OUT_THIS_BROWSER" as const,
    SIGN_UP: "SIGN_UP" as const,
  },
  designPhilosophyAndUx: {
    BACKEND_ERROR_HANDLING: "BACKEND_ERROR_HANDLING" as const,
    FRONTEND_ERROR_HANDLING: "FRONTEND_ERROR_HANDLING" as const,
    HEALTH_MODAL: "HEALTH_MODAL" as const,
    NO_CORS_POLICY: "NO_CORS_POLICY" as const,
    OOPS_VS_HMM: "OOPS_VS_HMM" as const,
    REDIRECT_UNINTENDED_ACCESS: "REDIRECT_UNINTENDED_ACCESS" as const,
    SAMESITE_STRICT_FOR_EVERYTHING: "SAMESITE_STRICT_FOR_EVERYTHING" as const,
    SERVER_REDIRECT: "SERVER_REDIRECT" as const,
    SINGLE_FRONT_BACK_ROUND_TRIP: "SINGLE_FRONT_BACK_ROUND_TRIP" as const,
  },
  whatProblemDoesItSolve: {
    BACKEND_ACCESS_VIA_CURL: "BACKEND_ACCESS_VIA_CURL" as const,
    CLICKJACKING: "CLICKJACKING" as const,
    CORS_DRIFT: "CORS_DRIFT" as const,
    CSRF: "CSRF" as const,
    EMAIL_ENUMARATION_BRUTE_FORCE: "EMAIL_ENUMARATION_BRUTE_FORCE" as const,
    HTTP_FLOODING_DDOS: "HTTP_FLOODING_DDOS" as const,
    LEAKY_CLIENT_CODE: "LEAKY_CLIENT_CODE" as const,
    TOKEN_DESYNC_ACROSS_TABS: "TOKEN_DESYNC_ACROSS_TABS" as const,
    TOKEN_THEFT: "TOKEN_THEFT" as const,
  },
}

export type ModalKeywordCode =
  | (typeof modalKeywordCode)["architectureAndTools"][keyof (typeof modalKeywordCode)["architectureAndTools"]]
  | (typeof modalKeywordCode)["coreFlow"][keyof (typeof modalKeywordCode)["coreFlow"]]
  | (typeof modalKeywordCode)["designPhilosophyAndUx"][keyof (typeof modalKeywordCode)["designPhilosophyAndUx"]]
  | (typeof modalKeywordCode)["whatProblemDoesItSolve"][keyof (typeof modalKeywordCode)["whatProblemDoesItSolve"]]
