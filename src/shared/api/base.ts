import { RestApi } from "./restApi";

const hostAddress = import.meta.env.VITE_API_URL;

export const restClient = new RestApi({
  baseURL: hostAddress,
  timeout: 60_000,
  timeoutErrorMessage: "Лимит в 60 секунд превышен",
  headers: { Accept: "application/json" },
});
