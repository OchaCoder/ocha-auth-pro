import type { Toast } from "~/___ctx___/internal/type-ctr"

export const addToast = (toast: { arr: Toast[] }, type: "green" | "yellow" | "red" | "close", txt: string) => {
  // Toast id
  const id = Date.now()

  // Add toast to the array and queue
  toast.arr.push({ id, type, txt })

  // Remove toast from the queue
  setTimeout(() => {
    toast.arr = toast.arr.filter((t) => id !== t.id)
  }, 7000)
}
