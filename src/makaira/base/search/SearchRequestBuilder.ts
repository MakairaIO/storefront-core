import { Makaira } from '../../Makaira'
import { BaseRequestBuilder } from '../BaseRequestBuilder'
import { SearchRequest } from './SearchRequest'

export class SearchRequestBuilder extends BaseRequestBuilder<SearchRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new SearchRequest())
    // this.setParams();
    return this
  }

  // private setParams() {
  //   this.setSearchPhrase(this.params.get("searchPhrase") ?? "");
  //   this.setCount(this.params.get("count") ?? this.apiInfo.productsPerPage);
  //   this.setOffset(this.params.get("offset") ?? 0);
  // }

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
