import type { System } from "~/___ctx___/internal/type-system"

/**
 * Returns true only if both parts of the backend infrastructure are stable.
 *
 * Checks:
 * - `system.health.isFastifyStable`
 * - `system.health.isServiceStable`
 *
 * @param system - The system object containing backend health information.
 * @returns true if both Fastify and service layers are stable; false otherwise.
 */
export const isAllStable = (system: System): boolean => {
  return system.health.isStable.fastify && system.health.isStable.infra
}
