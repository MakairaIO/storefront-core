import { Makaira } from '../../Makaira'
import { PageishRequestBuilder } from '../PageIshRequestBuilder'
import { SearchRequest } from './SearchRequest'

export class SearchRequestBuilder extends PageishRequestBuilder<SearchRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new SearchRequest())
    return this
  }

  public setUrl(url: string) {
    this.request.url = encodeURI(url)
    return this
  }

  public setSorting(sorting: typeof SearchRequest.prototype.sorting) {
    this.request.sorting = sorting
    return this
  }

  public setSearchPhrase(searchPhrase: string) {
    this.request.setSearchPhrase(searchPhrase)
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
}
