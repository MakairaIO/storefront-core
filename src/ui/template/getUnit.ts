import { MakairaThemeConfig } from './MakairaThemeConfig'

export const getUnit = (key: keyof MakairaThemeConfig) => {
  switch (key) {
    case 'spacing':
    case 'typescale':
      return 'rem'
    case 'colors':
      return ''
    case 'borderRadius':
    case 'breakpoints':
    default:
      return 'px'
  }
}
