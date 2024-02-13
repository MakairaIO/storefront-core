import { BaseRequest, BaseRequestBuilder } from '../makaira'

export const fetchMultiple = (
  ...requests: BaseRequestBuilder<BaseRequest>[]
) => {
  return Promise.all(requests.map((request) => request.fetch()))
}
