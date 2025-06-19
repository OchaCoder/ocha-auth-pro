import type { Ctr } from "./internal/type-ctr"
import type { System } from "./internal/type-system"
import type { User } from "./internal/type-user"

export type GlobalState = {
  ctr: Ctr
  user: User
  system: System
}
