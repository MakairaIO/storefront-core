import { CustomFilter, RequestBodyCustomFilter } from './CustomFilter'
import { FetchType } from '../Makaira'

export type Constraints = {
  'query.shop_id': string
  'query.language'?: string
  'query.use_stock'?: boolean
  'query.original_keys'?: boolean
  'query.everything'?: boolean
  'query.group'?: string
  'oi.user.agent'?: string
  'oi.user.ip'?: string
  'oi.user.timezone'?: string
  'ab.experiments'?: unknown
  'query.persona'?: string[]
}

export abstract class BaseRequest {
  aggregations: {
    [k: string]: any
  }
  public enableAggregations? = true
  sorting: {
    [k: string]: 'asc' | 'desc'
  }

  constraints: Constraints
  abstract type: FetchType

  customFilter: RequestBodyCustomFilter

  constructor() {
    this.constraints = {
      'query.shop_id': '1',
      'query.use_stock': true,
      'query.original_keys': true,
    }
    this.sorting = {}
    this.aggregations = {}
    this.customFilter = {
      and: [],
      or: [],
      not: [],
    }
  }

  public setConstraint<T extends keyof Constraints>(
    key: T,
    value: Constraints[T]
  ) {
    this.constraints[key] = value
  }

  public addSortKey(key: string, value: 'asc' | 'desc') {
    this.sorting[key] = value
  }

  public setAggregations(aggregations: BaseRequest['aggregations']) {
    this.aggregations = aggregations
  }

  public addAggregation<T extends string>(key: T, value: any) {
    this.aggregations[key] = value
  }

  public addCustomFilter(
    key: keyof RequestBodyCustomFilter,
    value: CustomFilter
  ) {
    this.customFilter[key].push(value)
  }

  public setCustomFilters(
    key: keyof RequestBodyCustomFilter | RequestBodyCustomFilter,
    value?: CustomFilter[]
  ) {
    if (typeof key !== 'string') {
      this.customFilter = key
      return
    }
    if (!value) {
      throw new Error('Custom filter value is missing')
    }
    this.customFilter[key] = value
  }
}
