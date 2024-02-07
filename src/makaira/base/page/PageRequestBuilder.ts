import { PageRequest } from './PageRequest'
import type { Makaira } from '../../Makaira'
import { BaseRequestBuilder } from '../BaseRequestBuilder'

// type BundleParams =
//   | {
//       bundleId?: undefined
//       currentSlot?: never
//       slots?: never
//     }
//   | {
//       bundleId: string
//       currentSlot: string
//       slots: {
//         [key: string]: string
//       }
//     }

export class PageRequestBuilder extends BaseRequestBuilder<PageRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new PageRequest())
    // this.setParams()
    // this.setBundles()

    if (this.seoUrl) {
      this.setUrl(this.seoUrl)
    }

    return this
  }

  public setUrl(url: string) {
    this.request.url = encodeURI(url)
    return this
  }

  public setSorting(sorting: typeof PageRequest.prototype.sorting) {
    this.request.sorting = sorting
    return this
  }

  public setCount(count: number | string) {
    this.request.count = parseInt(count as string, 10)
    return this
  }

  public setOffset(offset: number | string) {
    this.request.offset = parseInt(offset as string, 10)
    return this
  }

  // private setBundles() {
  //   const params = this.prepareBundleParams()
  //   const { bundleId, slots } = params
  //   if (!bundleId) {
  //     return
  //   }

  //   const bundles = {
  //     [bundleId]: {
  //       slots,
  //     },
  //   }

  //   this.request.bundles = bundles
  // }

  // private prepareBundleParams(): BundleParams {
  //   const cookies = parseCookies(this.ctx)
  //   const bundle = cookies['bundle']
  //   if (!bundle) {
  //     return {}
  //   }
  //   const bundleData = JSON.parse(bundle)
  //   const seoUrl = this.seoUrl!.replace(/\//g, '')

  //   const bundleId = this.params.get('bundleId')
  //   if (bundleId) {
  //     bundleData[seoUrl] = Object.fromEntries(this.params.entries())
  //     setCookie(this.ctx, 'bundle', JSON.stringify(bundleData), { path: '/' })
  //     return bundleData[seoUrl]
  //   } else if (bundleData[seoUrl]) {
  //     return bundleData[seoUrl]
  //   }

  //   return {}
  // }
}
