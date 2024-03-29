import { MakairaThemeConfig } from './MakairaThemeConfig'

export const defaultTheme: MakairaThemeConfig = {
  borderRadius: {
    none: 0,
    small: 4,
    full: 9999,
  },
  breakpoints: {
    xs: 520,
    s: 768,
    m: 1024,
    l: 1280,
    xl: 1640,
  },
  typescale: {
    h1: 2.986,
    h2: 2.488,
    h3: 2.074,
    h4: 1.728,
    h5: 1.44,
    h6: 1.2,
    regular: 1,
    small: 0.833,
    extraSmall: 0.694,
  },
  spacing: {
    xs: 0.25,
    s: 0.5,
    m: 1,
    l: 1.5,
    xl: 2,
  },
  colors: {
    base: {
      main: '#fff',
      darker: '#f8f8f8',
      darkest: '#303b47',
      content: '#101c2d',
    },
    primary: {
      main: '#4f5967',
      hover: '#101c2d',
      content: '#fff',
    },
    secondary: {
      main: '#fff',
      hover: '#fff',
      content: '#101c2d',
    },
    accent: {
      main: '#ff8e00',
      content: '#fff',
      hover: '#fa8b00',
    },
    info: {
      main: '#00b5ff',
      content: '#000',
    },
    success: {
      main: '#00aa6e',
      content: '#000',
    },
    warning: {
      main: '#ffbe00',
      content: '#000',
    },
    danger: {
      main: '#ff5861',
      content: '#fff',
    },
    neutral: {
      main: '#181a2a',
      content: '#edf2f6',
    },
  },
}
