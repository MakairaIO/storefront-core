import postcss from 'postcss'
import { makairaThemePlugin } from './plugin'

describe('PostCSS plugin', () => {
  test('it should create a new rule with the selector :root', async () => {
    const input = '@makaira-theme;'
    await postcss([makairaThemePlugin])
      .process(input, { from: undefined })
      .then((result) => {
        expect(result.css.includes(':root')).toBeTruthy()
      })
  })
  test('it should replace media query variables with their proper values', async () => {
    const input =
      '@media screen and (min-width var(--breakpoint-s)) {\
        body {\
          color: red;\
        }\
      }\
    '
    await postcss([makairaThemePlugin])
      .process(input, { from: undefined })
      .then((result) => {
        expect(result.css.includes('768px')).toBeTruthy()
      })
  })
})
