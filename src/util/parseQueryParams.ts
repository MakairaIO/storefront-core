import type { ParsedUrlQuery } from 'querystring'

export const parseQueryParams = (query: ParsedUrlQuery) => {
  const params = new URLSearchParams() // Convert the query object to a URLSearchParams instance
  for (const key in query) {
    const value = query[key]
    if (!value) continue
    if (Array.isArray(value)) {
      value.forEach((value) => params.append(key, value))
      continue
    }

    params.append(key, value)
  }

  return params
}
