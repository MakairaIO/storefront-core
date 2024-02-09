# Storefront Core

This package contains an API wrapper around the [Makaira](https://makaira.io) API.

## How to use

To get started you'll have to implement your own Makaira client. This can be done by creating a new class that extends from the `Makaira` class.

```ts
import { Makaira } from '@makaira/storefront-core'

class MakairaClient extends Makaira {
  apiUrl = 'https://[your-shop].makaira.io'
  apiInstance = '[instance]'
  productsPerPage = 36
}

export const makairaClient = new MakairaClient()
```

You can now use the Makaira Client instance to perform all types of requests to the Makaira API.

**Example**

```ts
const menuData = makairaClient.request('menu').fetch()
const searchData = makairaClient
  .request('search')
  .setSearchPhrase('kite')
  .fetch()
```

In order to avoid having to call `.fetch()` on every request, especially when performing multiple requests at once, `storefront-core` provides a `fetchMultiple` utility function.

```ts
import { fetchMultiple } from '@makaira/storefront-core'

const [pageData, menuData] = fetchMultiple(
  makairaClient.request('page').setUrl('/de'),
  makairaClient.request('menu')
)
```

## Extensibility

If you want to use this api client in a server side rendered context or have other needs to automate some of the request building away, you can always override the `request` method on the `MakairaClient` class.

**Next.js example**

```ts
// MakairaClient.ts
import type { FetchType, RequestBuilderMapping } from '@makaira/storefront-core'

class MakairaClient extends Makaira {
  request<T extends FetchType>(
    type: T,
    ctx?: NextPageContext
  ): RequestBuilderMapping[T] {
    const builder = super.request(type)

    // do something with the builder

    return builder
  }
}

// server side data fetching
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const menuData = makairaClient.request('menu', ctx)
}
```
