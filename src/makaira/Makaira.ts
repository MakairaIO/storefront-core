import {
  DocumentRequestBuilder,
  MenuRequestBuilder,
  PageRequestBuilder,
  RecommendationRequestBuilder,
  SnippetRequestBuilder,
  SearchRequestBuilder,
} from './base'

export type NewRequestManagerOptions = {
  makaira: Makaira
}

export type RequestBuilderMapping = {
  snippet: SnippetRequestBuilder
  page: PageRequestBuilder
  search: SearchRequestBuilder
  privateSearch: PageRequestBuilder
  document: DocumentRequestBuilder
  recommendation: RecommendationRequestBuilder
  menu: MenuRequestBuilder
}

export type FetchType = keyof RequestBuilderMapping

export abstract class Makaira {
  protected static makaira: Makaira
  abstract apiUrl: string
  abstract apiInstance: string
  abstract productsPerPage: number

  public static get(): Makaira {
    return this.makaira
  }

  public request<T extends FetchType>(type: T): RequestBuilderMapping[T] {
    switch (type) {
      case 'snippet':
        return new SnippetRequestBuilder(this) as RequestBuilderMapping[T]
      case 'document':
        return new DocumentRequestBuilder(this) as RequestBuilderMapping[T]
      case 'menu':
        return new MenuRequestBuilder(this) as RequestBuilderMapping[T]
      case 'privateSearch':
        return new PageRequestBuilder(this) as RequestBuilderMapping[T]
      case 'recommendation':
        return new RecommendationRequestBuilder(
          this
        ) as RequestBuilderMapping[T]
      case 'search':
        return new SearchRequestBuilder(this) as RequestBuilderMapping[T]
      case 'page':
      default:
        return new PageRequestBuilder(this) as RequestBuilderMapping[T]
    }
  }
}
