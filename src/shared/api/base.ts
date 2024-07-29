import { useSessionState } from "@/entities/user/model"
import { RestApi } from "./restApi"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { GraphQLClient, RequestMiddleware } from "graphql-request"
import { toast } from "vue-sonner"
import { getErrorInfo } from "../lib/error-analyzer"

const hostAddress = import.meta.env.VITE_API_URL

export const restClient = new RestApi({
  baseURL: `${hostAddress}/api`,
  timeout: 60_000,
  timeoutErrorMessage: "Лимит в 60 секунд превышен",
  headers: { Accept: "application/json" },
})

const requestMiddleware: RequestMiddleware = async (request) => {
  const token = await requestValidAccessToken()
  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
}
export const graphqlClient = new GraphQLClient(`${hostAddress}/graphql`, {
  requestMiddleware,
})

restClient.instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (err) => {
    const { description, header } = getErrorInfo(err)
    toast.error(header, { description, position: "top-center" })

    if (axios.isAxiosError(err)) {
      if (err.message === "Network Error" || err.request.status === 401) {
        useSessionState().isAuth.value = false
        if (!window.location.pathname.includes("/login")) {
          window.location.replace("/login")
        }
      }
    }

    return Promise.reject(err)
  }
)

function isAccessTokenFresh({
  token,
  nowTime,
}: {
  token?: string | null
  nowTime: number
}) {
  if (!token) return false

  try {
    const decodedToken = jwtDecode(token)

    if (!decodedToken.exp) return false

    return decodedToken.exp > nowTime
  } catch (e) {
    return false
  }
}

let refetchTokenRequestBusy = false
async function requestValidAccessToken() {
  // check date of a token
  let accessToken = localStorage.getItem("jwt")
  const now = Math.floor(Date.now() / 1000)
  const session = useSessionState()

  const fresh = isAccessTokenFresh({ token: accessToken, nowTime: now })
  if (!fresh) {
    if (refetchTokenRequestBusy === false) {
      refetchTokenRequestBusy = true

      const promise = restClient.user.refreshTokenUserRefreshTokenPost({
        skipAuth: true,
        withCredentials: true,
      })
      toast.promise(promise, {
        loading: "Автоматическое продление сессии",
        description: "Работа вскоре возобновится",
        position: "top-center",
        success(data) {
          const jwt = data.data.access_token.token
          accessToken = jwt
          localStorage.setItem("jwt", jwt)
          refetchTokenRequestBusy = false
          return "Сессия обновлена"
        },
        error: () => {
          refetchTokenRequestBusy = false
          return "Обновление сессии закончилась неудачно"
        },
      })
    }

    if (!accessToken) {
      session.logoutWithoutRequest()
    }
  }

  return accessToken
}

restClient.instance.interceptors.request.use(async (req) => {
  if (req.skipAuth) {
    return req
  }

  const accessToken = await requestValidAccessToken()

  req.headers["Authorization"] = `Bearer ${accessToken}`

  return req
})
