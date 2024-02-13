import postcss from 'postcss'
import { makairaThemePlugin } from './plugin'

describe('PostCSS plugin', () => {
  test('it should create a new rule with the selector :root', async () => {
    const input = '@makaira-theme;'
    await postcss([makairaThemePlugin])
      .process(input, { from: undefined })
      .then((result) => {
        console.log(result.css)
        expect(result.css.includes(':root')).toBeTruthy()
      })
  })
})
