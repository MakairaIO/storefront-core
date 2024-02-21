import stylelint, { type Rule } from 'stylelint'
import { variableNames } from '../template/variableNames'
import { colorRules, spacingRules } from './rules'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = '@makaira/require-variables'

const messages = ruleMessages(ruleName, {
  invalidColor: (rule, selector) =>
    `Invalid use of color "${rule}: ${selector}", use a theme variable instead`,
  invalidBreakpoint: (breakpoint) =>
    `Invalid breakpoint "${breakpoint}", use a theme variable instead`,
  invalidSpacing: (rule, spacing) =>
    `Invalid spacing "${rule}: ${spacing}", use a theme variable instead`,
  invalidTypescale: (rule, typescale) =>
    `Invalid fontsize "${rule}: ${typescale}", use a theme variable instead`,
  invalidBorderRadius: (rule, borderRadius) =>
    `Invalid borderRadius "${rule}: ${borderRadius}", use a theme variable instead`,
})

const ruleFunction: Rule = (primary) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    })

    if (!validOptions) return

    root.walkAtRules('media', (atRule) => {
      // check if the media query value is not a breakpoint name
      const breakpoint = atRule.params
      if (!breakpoint.includes(variableNames['breakpoints'])) {
        report({
          result,
          ruleName,
          message: messages.invalidBreakpoint(breakpoint),
          node: atRule,
          word: breakpoint,
        })
      }
    })

    root.walkDecls((decl) => {
      const { value, prop } = decl
      if (colorRules.includes(prop)) {
        const validColorsOutsideOfVariables = ['none', 'transparent']
        // invalid color value
        if (
          value.includes('#') &&
          !validColorsOutsideOfVariables.some((color) => value.includes(color))
        ) {
          report({
            result,
            ruleName,
            message: messages.invalidColor(prop, value),
            node: decl,
            word: prop,
          })
        }
      }

      if (spacingRules.includes(prop)) {
        // invalid spacing value
        const validSpacingOutsideOfVariables = ['0', 'auto']
        if (
          !value.includes(variableNames['spacing']) &&
          !validSpacingOutsideOfVariables.some((spacing) =>
            value.includes(spacing)
          )
        ) {
          report({
            result,
            ruleName,
            message: messages.invalidSpacing(prop, value),
            node: decl,
            word: prop,
          })
        }
      }

      if (prop === 'font-size') {
        if (value.includes('%')) {
          return
        }
        if (!value.includes(variableNames['typescale'])) {
          report({
            result,
            ruleName,
            message: messages.invalidSpacing(prop, value),
            node: decl,
            word: prop,
          })
        }
      }

      if (prop === 'border-radius') {
        // if no borderradiusname is found in the value
        if (!value.includes(variableNames['borderRadius'])) {
          report({
            result,
            ruleName,
            message: messages.invalidBorderRadius(prop, value),
            node: decl,
            word: prop,
          })
        }
      }
    })
  }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages

export default createPlugin(ruleName, ruleFunction)
