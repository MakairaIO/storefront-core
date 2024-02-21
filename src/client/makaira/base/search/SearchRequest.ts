import { FetchType } from '../../Makaira'
import { PageRequest } from '../page'

export class SearchRequest extends PageRequest {
  type: FetchType = 'search'

  public setSearchPhrase(searchPhrase: string) {
    this.searchPhrase = searchPhrase
    this.isSearch = true
  }
}
