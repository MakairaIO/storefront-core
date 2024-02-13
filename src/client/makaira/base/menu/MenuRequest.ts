import { BaseRequest } from '../BaseRequest'
import type { FetchType } from '../../Makaira'

export class MenuRequest extends BaseRequest {
  type: FetchType = 'menu'
  constructor() {
    super()
  }
}
