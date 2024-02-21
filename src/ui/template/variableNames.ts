import { MakairaThemeConfig } from './MakairaThemeConfig'
import { defaultTheme } from './MakairaThemeDefaults'

export const variableNames: Record<keyof MakairaThemeConfig, string> = {
  borderRadius: '--border-radius-',
  breakpoints: '--breakpoint-',
  colors: '--color-',
  spacing: '--spacing-',
  typescale: '--font-',
}

export const getVariableNames = (key: keyof MakairaThemeConfig) => {
  const names: string[] = []
  const prefix = variableNames[key as keyof MakairaThemeConfig]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const config = defaultTheme[key as keyof MakairaThemeConfig]!
  Object.keys(config).forEach((subKey) => {
    if (typeof config[subKey as keyof typeof config] === 'object') {
      Object.keys(config[subKey as keyof typeof config]).forEach((colorKey) => {
        names.push(`${prefix}${subKey.toLowerCase()}-${colorKey}`)
      })
      return
    }
    names.push(`${prefix}${subKey.toLowerCase()}`)
  })

  return names
}
