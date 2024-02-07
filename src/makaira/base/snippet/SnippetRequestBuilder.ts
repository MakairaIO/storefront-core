import { SnippetRequest } from './SnippetRequest'
import type { Makaira } from '../../Makaira'
import { BaseRequestBuilder } from '../BaseRequestBuilder'

export class SnippetRequestBuilder extends BaseRequestBuilder<SnippetRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new SnippetRequest())
    return this
  }

  public addSnippet(id: string) {
    this.request.addSnippet(id)
    return this
  }

  public setSnippets(snippets: string[]) {
    this.request.snippetIds = snippets
    return this
  }
}
