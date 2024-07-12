import { useSessionState } from "@/entities/user/model";
import { RestApi } from "./restApi";

const hostAddress = import.meta.env.VITE_API_URL;

export const restClient = new RestApi({
  baseURL: hostAddress,
  timeout: 60_000,
  timeoutErrorMessage: "Лимит в 60 секунд превышен",
  headers: { Accept: "application/json" },
});

restClient.instance.interceptors.response.use((response) => {
  const authHeader = response.headers["Authorization"] as string;
  if (authHeader) {
    useSessionState().setJwt(authHeader.replace("Bearer ", ""));
  }

  return response;
});
restClient.instance.interceptors.request.use(async (config) => {
  if (config.skipAuth) {
    return config;
  }

  const token = localStorage.getItem("jwt");

  config.headers && (config.headers["Authorization"] = `Bearer ${token}`);
  return config;
});
