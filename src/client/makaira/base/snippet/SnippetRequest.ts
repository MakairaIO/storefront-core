import { BaseRequest } from '../BaseRequest'
import { FetchType } from '../../Makaira'

export class SnippetRequest extends BaseRequest {
  snippetIds: string[]

  type: FetchType = 'snippet'

  constructor() {
    super()
    this.snippetIds = []
  }

  public addSnippet(id: string) {
    this.snippetIds.push(id)
  }
}
