import { PageRequest } from './PageRequest'
import type { Makaira } from '../../Makaira'
import { PageishRequestBuilder } from '../PageIshRequestBuilder'

export class PageRequestBuilder extends PageishRequestBuilder<PageRequest> {
  constructor(apiInfo: Makaira) {
    super(apiInfo, new PageRequest())
    if (this.seoUrl) {
      this.setUrl(this.seoUrl)
    }

    return this
  }

  public setUrl(url: string) {
    this.request.url = encodeURI(url)
    return this
  }

  public setBundles(bundles: PageRequest['bundles']) {
    this.request.bundles = bundles
    return this
  }
}
