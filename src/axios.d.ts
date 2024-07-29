import { AxiosRequestConfig as OriginalAxiosRequestConfig } from "axios"

declare module "axios" {
  // todo Решить проблему Type 'AxiosRequestConfig<D>' recursively references itself as a base type
  // eslint-disable-next-line
  // @ts-ignore
  export interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    // custom properties
    skipAuth?: boolean
    skipAuthWithToken?: boolean
  }
}
