import { BaseRequest } from '../BaseRequest'
import { FetchType } from '../../Makaira'

export class DocumentRequest extends BaseRequest {
  includeContent?: boolean
  ids: string[]
  datatype?: 'makaira-product' | 'makaira-productgroup' | 'variant' | 'product'
  fields: string[]
  type: FetchType = 'document'

  constructor() {
    super()
    this.fields = []
    this.ids = []
  }

  public addField(field: string) {
    this.fields.push(field)
  }

  public addId(id: string) {
    this.ids.push(id)
  }
}
