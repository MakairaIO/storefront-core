import { BaseRequest } from './BaseRequest'
import type { Makaira } from '../Makaira'
import type { CustomFilter, RequestBodyCustomFilter } from './CustomFilter'
import { fetchFromMakaira } from './fetchFromMakaira'

export type ServerContext = {
  req: {
    headers: HeadersInit
  }
  params:
    | {
        [key: string]: string | string[] | undefined
      }
    | URLSearchParams
}

export class BaseRequestBuilder<T extends BaseRequest> {
  protected request: T

  protected serverContext?: ServerContext
  protected params: ServerContext['params'] = new URLSearchParams()

  protected seoUrl: string | undefined
  protected apiInfo: Makaira

  constructor(apiInfo: Makaira, request: T) {
    this.request = request
    this.apiInfo = apiInfo
  }

  public setConstraints(constraints: BaseRequest['constraints']) {
    this.request.constraints = constraints
    return this
  }

  public setConstraint<T extends keyof BaseRequest['constraints']>(
    key: T,
    value: BaseRequest['constraints'][T]
  ) {
    this.request.constraints[key] = value
    return this
  }

  public addCustomFilter(
    key: keyof RequestBodyCustomFilter,
    value: CustomFilter
  ) {
    this.request.customFilter[key].push(value)
    return this
  }

  public setCustomFilters(
    key: keyof RequestBodyCustomFilter | RequestBodyCustomFilter,
    value?: CustomFilter[]
  ) {
    if (typeof key !== 'string') {
      this.request.customFilter = key
      return this
    }
    if (!value) {
      throw new Error('Custom filter value is missing')
    }
    this.request.customFilter[key] = value
    return this
  }

  /**
   * Builds the request object for use with the `fetchFromMakaira` function
   * @returns {T} the request object.
   */
  public build(): T {
    return this.request
  }

  // TODO: add result typing
  public fetch(additionalHeaders?: RequestInit['headers']) {
    return fetchFromMakaira({
      apiInfo: this.apiInfo,
      additionalHeaders,
      request: this.build(),
    })
  }
}
