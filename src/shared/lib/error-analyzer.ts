import { isAxiosError } from "axios"
import { toast } from "vue-sonner"

type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    return new Error(String(maybeError))
  }
}

type ErrorNotificationOptions = {
  error: Error
  name?: string | unknown
}
export function handleErrorNotification(context: ErrorNotificationOptions) {
  const { header: message, description } = getErrorInfo(context.error)

  toast.error(context.name || "Ошибка", {
    position: "top-center",
    description: message,
    action:
      message.length > 80
        ? {
            label: "Копировать код",
            onClick: () => {
              navigator.clipboard.writeText(
                description ? `${message}|${description}` : message
              )
            },
          }
        : undefined,
  })
}

export function getErrorInfo(error: unknown) {
  if (isAxiosError(error)) {
    return {
      header: toErrorWithMessage(error).message,
      description: error.response?.data?.detail,
    }
  }

  return { header: toErrorWithMessage(error).message, description: "" }
}
