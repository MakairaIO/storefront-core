type MakairaColor = {
  main: string
  hover: string
  content: string
}

type InfoColor = Omit<MakairaColor, 'hover'>

export type MakairaThemeConfig = Partial<{
  colors: {
    primary: MakairaColor
    secondary: MakairaColor
    accent: MakairaColor
    neutral: InfoColor
    info: InfoColor
    success: InfoColor
    warning: InfoColor
    danger: InfoColor
    base: {
      main: string
      darker?: string
      darkest?: string
      content: string
    }
  }
  spacing: {
    xs: number
    s: number
    m: number
    l: number
    xl: number
  }
  typescale: {
    h1: number
    h2: number
    h3: number
    h4: number
    h5: number
    h6: number
    regular: number
    small: number
    extraSmall: number
  }
  breakpoints: {
    xs: number
    s: number
    m: number
    l: number
    xl: number
  }
  borderRadius: {
    none: number
    small: number
    full: number
  }
}>
