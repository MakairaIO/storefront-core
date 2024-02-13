import { Makaira } from '../Makaira'
import { BaseRequestBuilder } from './BaseRequestBuilder'
import { PageRequest } from './page/PageRequest'
import { SearchRequest } from './search'

// This is a shared request builder for the page and the search request builder
// they are both types of page requests
// nameing is hard
export class PageishRequestBuilder<
  T extends PageRequest | SearchRequest
> extends BaseRequestBuilder<T> {
  /**
   *
   */
  constructor(apiInfo: Makaira, builder: T) {
    super(apiInfo, builder)
    this.setCount(apiInfo.productsPerPage)
  }

  public setSorting(sorting: typeof PageRequest.prototype.sorting) {
    this.request.sorting = sorting
    return this
  }

  public setCount(count: number | string) {
    this.request.count = parseInt(count as string, 10)
    return this
  }

  public setOffset(offset: number | string) {
    this.request.offset = parseInt(offset as string, 10)
    return this
  }

  public generateAggregations(params: URLSearchParams) {
    const filterObject: {
      [key: string]: any
    } = {}

    for (const [key, value] of Array.from(params.entries())) {
      if (!key.startsWith('filter[')) continue

      // Remove 'filter[' from start and ']' from the end, then split by '][' to get individual keys
      const path = key.slice(7, -1).split('][')
      let current = filterObject

      path.forEach((part: string | number, index: number) => {
        const isLastPart: boolean = index === path.length - 1

        if (isLastPart) {
          if (Array.isArray(current[part])) {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;(current[part] as string[]).push(value)
            return
          }

          if (current[part]) {
            current[part] = [current[part], value]
            return
          }

          current[part] = value
          return
        }

        if (!current[part]) {
          current[part] = isNaN(Number(path[index + 1])) ? {} : []
        } else if (typeof current[part] === 'string') {
          // Handle unexpected string value where an object or array is expected
          current[part] = isNaN(Number(path[index + 1])) ? {} : [current[part]]
        }

        current = current[part]
      })
    }

    this.request.aggregations = filterObject
    return this
  }

  public generateOffset(params: URLSearchParams) {
    const offset = params.get('offset')
    if (offset) {
      this.setOffset(offset)
    }
    return this
  }
}
