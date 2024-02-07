import { MenuRequest } from './MenuRequest'
import type { Makaira } from '../../Makaira'
import { BaseRequestBuilder } from '../BaseRequestBuilder'
import { fetchFromMakaira } from '../fetchFromMakaira'

export class MenuRequestBuilder extends BaseRequestBuilder<MenuRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new MenuRequest())
    return this
  }

  public async fetch(additionalHeaders?: HeadersInit | undefined) {
    const response = await fetchFromMakaira({
      apiInfo: this.apiInfo,
      request: this.build(),
      additionalHeaders,
    })

    return response.menu
  }
}
