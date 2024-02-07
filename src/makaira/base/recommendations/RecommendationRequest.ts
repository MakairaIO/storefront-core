import { BaseRequest } from '../BaseRequest'
import { FetchType } from '../../Makaira'

export class RecommendationRequest extends BaseRequest {
  type: FetchType = 'recommendation'

  count: number
  recommendationId: string[]
  productId: string[]

  constructor() {
    super()
    this.count = 4
    this.recommendationId = []
    this.productId = []
  }
}
