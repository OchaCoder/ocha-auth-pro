export type System = {
  health: {
    display: { lastHeartbeat: string }
    isStable: { fastify: boolean; infra: boolean }
    showModal: { isInitialLoad: number }
    reconnectStrategy: { exponentialDelay: number; timeoutId: number }
  }
}
