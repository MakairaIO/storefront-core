import { type PluginCreator, rule, AtRule } from 'postcss'
import { defaultTheme } from './MakairaThemeDefaults'
import { MakairaThemeConfig } from './MakairaThemeConfig'
import { variableNames } from './variableNames'
import { getUnit } from './getUnit'
import { readFileSync } from 'fs'

const plugin: PluginCreator<never> = () => {
  return {
    postcssPlugin: 'Makaira Theme Provider',
    Once(root) {
      let theme = defaultTheme
      try {
        const themeJSON = readFileSync('theme.json', 'utf-8')
        theme = JSON.parse(themeJSON)
      } catch {
        console.warn('Couldn\'t find theme.json, using default theme.')
      }
      root.walkAtRules('makaira-theme', (atRule) => {
        const newRule = rule({ selector: ':root' })

        // iterate over the defaultTheme object. for every key, check if the theme object has a value for that key. if it does, create a new decl with the key and value
        // if not, use the default value
        Object.keys(defaultTheme).forEach((key) => {
          const prefix = variableNames[key as keyof MakairaThemeConfig]
          const config =
            theme?.[key as keyof MakairaThemeConfig] ||
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            defaultTheme[key as keyof MakairaThemeConfig]!
          Object.keys(config).forEach((subKey) => {
            if (typeof config[subKey as keyof typeof config] === 'object') {
              // colors
              Object.keys(config[subKey as keyof typeof config]).forEach(
                (colorKey) => {
                  newRule.append({
                    prop: `${prefix}${subKey.toLowerCase()}-${colorKey}`,
                    value:
                      config[subKey as keyof typeof config][
                        colorKey as keyof typeof config
                      ],
                  })
                }
              )
              return
            }
            newRule.append({
              prop: `${prefix}${subKey.toLowerCase()}`,
              value:
                config[subKey as keyof typeof config] +
                getUnit(key as keyof MakairaThemeConfig),
            })
          })
        })

        atRule.replaceWith(newRule)
      })
      root.walkAtRules('media', (atRule) => {
        // create new at rule, but replaec value with the theme value
        const newRule = new AtRule({
          name: 'media',
          params: atRule.params,
          nodes: atRule.nodes,
        })
        const regex = /var\(--[\w-]*\)/g
        newRule.params = newRule.params.replace(regex, (match) => {
          match = match.replace(/var|\(|\)|--breakpoint-/g, '')
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            theme.breakpoints[match as keyof typeof theme.breakpoints]! +
            getUnit('breakpoints')
          )
        })

        atRule.replaceWith(newRule)
      })
    },
  }
}

plugin.postcss = true

export { plugin as makairaThemePlugin }
