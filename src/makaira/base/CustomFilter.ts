export type CustomFilterOperator = 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte'

export type CustomFilterAttribute = {
  attribute: string
  operator: CustomFilterOperator
  value: unknown
  dataType?: string
}

export type CustomFilterField = {
  field: string
  value: unknown
  operator: CustomFilterOperator
}

export type CustomFilter = CustomFilterAttribute | CustomFilterField

export type RequestBodyCustomFilter = {
  and: CustomFilter[]
  or: CustomFilter[]
  not: CustomFilter[]
}
