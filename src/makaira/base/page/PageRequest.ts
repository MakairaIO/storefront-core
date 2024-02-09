import { BaseRequest } from '../BaseRequest'
import { FetchType } from '../../Makaira'

export class PageRequest extends BaseRequest {
  protected searchPhrase = ''
  protected isSearch = false

  bundles?: { [key: string]: unknown }
  slot?: unknown

  url?: string

  count!: number
  offset: number
  type: FetchType = 'page'

  constructor() {
    super()
    this.offset = 0
    if (this.type === 'page') {
      this.bundles = {}
    }
  }
}
