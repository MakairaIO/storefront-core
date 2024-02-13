import { type PluginCreator, rule } from 'postcss'
import { defaultTheme } from './MakairaThemeDefaults'
import { MakairaThemeConfig } from './MakairaThemeConfig'
import { variableNames } from './variableNames'
import { getUnit } from './getUnit'

const plugin: PluginCreator<{ theme?: MakairaThemeConfig }> = (opts) => {
  return {
    postcssPlugin: 'Makaira Theme Provider',
    Once(root) {
      root.walkAtRules('makaira-theme', (atRule) => {
        const newRule = rule({ selector: ':root' })

        let theme = opts?.theme
        if (!theme) {
          theme = defaultTheme
        }

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
    },
  }
}

plugin.postcss = true

export { plugin as makairaThemePlugin }
