import { useSessionState } from "@/entities/user/model";
import { RestApi } from "./restApi";
import axios from "axios";
import { router } from "@/pages/routes/routes";

const hostAddress = import.meta.env.VITE_API_URL;

export const restClient = new RestApi({
  baseURL: `${hostAddress}/api`,
  timeout: 60_000,
  timeoutErrorMessage: "Лимит в 60 секунд превышен",
  headers: { Accept: "application/json" },
  withCredentials: true
});

restClient.instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (axios.isAxiosError(err)) {
      if (err.message === "Network Error") {
        useSessionState().isAuth.value = false;
        if (!window.location.pathname.includes("/login")) {
          window.location.replace("/login");
        }
      }
    }

    return Promise.reject(err);
  }
);
