import { DocumentRequest } from './DocumentRequest'
import type { Makaira } from '../../Makaira'
import { BaseRequestBuilder } from '../BaseRequestBuilder'

export class DocumentRequestBuilder extends BaseRequestBuilder<DocumentRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new DocumentRequest())
    return this
  }

  public setDataType(datatype: DocumentRequest['datatype']) {
    this.request.datatype = datatype
    return this
  }

  public addId(id: string) {
    this.request.addId(id)
    return this
  }

  public setIds(ids: string[]) {
    this.request.ids = ids
    return this
  }

  public addField(field: string) {
    this.request.addField(field)
    return this
  }

  public setFields(fields: string[]) {
    this.request.fields = fields
    return this
  }

  public build() {
    if (!this.request.datatype) {
      throw new Error('DocumentRequestBuilder: datatype is required')
    }

    return super.build()
  }
}
