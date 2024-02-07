import type { Makaira } from '../../Makaira'
import { BaseRequestBuilder } from '../BaseRequestBuilder'
import { fetchFromMakaira } from '../fetchFromMakaira'
import { RecommendationRequest } from './RecommendationRequest'

export class RecommendationRequestBuilder extends BaseRequestBuilder<RecommendationRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new RecommendationRequest())
    return this
  }

  public async fetch(additionalHeaders?: HeadersInit | undefined) {
    const response = await fetchFromMakaira({
      apiInfo: this.apiInfo,
      request: this.build(),
      additionalHeaders,
    })

    return response.data
  }
}
