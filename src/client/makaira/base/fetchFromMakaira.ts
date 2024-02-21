import { ErrorBody, MakairaError } from './MakairaError'
import { Makaira } from '../Makaira'
import { BaseRequest } from './BaseRequest'
import { FetchType } from '../Makaira'

export type RequestOptions = {
  request: BaseRequest
  additionalHeaders?: RequestInit['headers']
  apiInfo: Makaira
}

export async function fetchFromMakaira({
  request,
  additionalHeaders = {},
  apiInfo,
}: RequestOptions) {
  const { type, ...rest } = request

  const endpoint = apiInfo.apiUrl + getEndpoint(type)

  const response = await fetch(endpoint, {
    method: type === 'menu' ? 'GET' : 'POST',
    body: type === 'menu' ? undefined : JSON.stringify(rest),
    headers: {
      'Content-Type': 'application/json',
      'X-Makaira-Instance': apiInfo.apiInstance,
      ...additionalHeaders,
    },
  })

  if (!response.ok) {
    await throwMakairaError(response)
  }

  return response.json()
}

async function throwMakairaError(response: Response) {
  const { status, statusText } = response
  const errorBody = (await response.json()) as ErrorBody
  const error = new MakairaError(status, statusText, errorBody)
  console.error(error)
  throw error
}

function getEndpoint(type: FetchType) {
  switch (type) {
    case 'search':
      return '/search/public'
    case 'privateSearch':
      return '/search'
    case 'document':
      return '/documents/public'
    case 'recommendation':
      return '/recommendation/public'
    case 'snippet':
      return '/enterprise/snippets'
    case 'page':
      return '/enterprise/page'
    case 'menu':
      return '/enterprise/menu'
  }
}
