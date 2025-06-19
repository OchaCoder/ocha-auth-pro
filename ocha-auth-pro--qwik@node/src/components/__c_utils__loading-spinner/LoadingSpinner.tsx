import { component$ } from "@builder.io/qwik"
import { IconLoading } from "../__c_utils__svg/internal/icon-loading"

export const LoadingSpinner = component$(({ fill = "#fff" }: { fill?: string }) => {
  return (
    <div class="flex items-center spinner">
      <IconLoading fill={fill} />
    </div>
  )
})
