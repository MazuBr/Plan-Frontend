/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AccessTokenData */
export interface AccessTokenData {
  /** Token */
  token: string
  /** Expires In */
  expires_in: number
}

/** CheckSessionResponse */
export interface CheckSessionResponse {
  /** Detail */
  detail: string
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[]
}

/** LoginRequest */
export interface LoginRequest {
  /** Identifier */
  identifier: string
  /**
   * Password
   * @minLength 8
   */
  password: string
}

/** LoginResponse */
export interface LoginResponse {
  /** Detail */
  detail: string
  access_token: AccessTokenData
}

/** LogoutResponse */
export interface LogoutResponse {
  /** Detail */
  detail: string
}

/** RefreshTokenResponse */
export interface RefreshTokenResponse {
  /** Detail */
  detail: string
  access_token: AccessTokenData
}

/** UserCreate */
export interface UserCreate {
  /**
   * Username
   * @maxLength 50
   */
  username: string
  /**
   * Email
   * @format email
   */
  email: string
  /**
   * Password
   * @minLength 8
   */
  password: string
  /** First Name */
  first_name?: string | null
  /** Last Name */
  last_name?: string | null
  /** Phone */
  phone?: string | null
  /** Address */
  address?: string | null
}

/** UserResponse */
export interface UserResponse {
  /** Id */
  id: number
  /** Username */
  username: string
  /**
   * Email
   * @format email
   */
  email: string
  /** First Name */
  first_name?: string | null
  /** Last Name */
  last_name?: string | null
  /** Phone */
  phone?: string | null
  /** Address */
  address?: string | null
  access_token: AccessTokenData
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[]
  /** Message */
  msg: string
  /** Error Type */
  type: string
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios"
import axios from "axios"

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"]
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "/api",
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        )
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    })
  }
}

/**
 * @title FastAPI
 * @version 0.1.0
 * @baseUrl /api
 */
export class RestApi<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags users
     * @name CreateUserUserCreatePost
     * @summary Create User
     * @request POST:/user/create
     */
    createUserUserCreatePost: (data: UserCreate, params: RequestParams = {}) =>
      this.request<UserResponse, HTTPValidationError>({
        path: `/user/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name LoginUserLoginPost
     * @summary Login
     * @request POST:/user/login
     */
    loginUserLoginPost: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<LoginResponse, HTTPValidationError>({
        path: `/user/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name LogoutUserUserLogoutPost
     * @summary Logout User
     * @request POST:/user/logout
     */
    logoutUserUserLogoutPost: (params: RequestParams = {}) =>
      this.request<LogoutResponse, any>({
        path: `/user/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name RefreshTokenUserRefreshTokenPost
     * @summary Refresh Token
     * @request POST:/user/refresh-token
     */
    refreshTokenUserRefreshTokenPost: (params: RequestParams = {}) =>
      this.request<RefreshTokenResponse, any>({
        path: `/user/refresh-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name AbobaUserAbobaPost
     * @summary Aboba
     * @request POST:/user/aboba
     */
    abobaUserAbobaPost: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/user/aboba`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name CheckSessionUserCheckSessionPost
     * @summary Check Session
     * @request POST:/user/check-session
     */
    checkSessionUserCheckSessionPost: (params: RequestParams = {}) =>
      this.request<CheckSessionResponse, any>({
        path: `/user/check-session`,
        method: "POST",
        format: "json",
        ...params,
      }),
  }
}
