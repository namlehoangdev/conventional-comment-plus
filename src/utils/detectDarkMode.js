import tinycolor from 'tinycolor2'
import { ColorModes, LOG_TAG } from 'constants'

function getElementInheritedBackgroundColor(element) {
  const styles = window.getComputedStyle(element)
  let backgroundColor = styles.backgroundColor
 
  if (tinycolor(backgroundColor).getAlpha() === 0) {
    const parentElement = element.parentElement
    if (parentElement) {
      backgroundColor = getElementInheritedBackgroundColor(parentElement)
    } else {
      backgroundColor = 'white'
    }
  }

  return backgroundColor
}

function checkModeByElementBackground(element) {
  if (!element) {
    return null
  }

  const backgroundColor = getElementInheritedBackgroundColor(element)

  console.debug(
    `${LOG_TAG} Detected element background=${backgroundColor} isLight=${tinycolor(backgroundColor).isLight()}`
  )

  return tinycolor(backgroundColor).isLight() ? ColorModes.DEFAULT_LIGHT : ColorModes.DEFAULT_DARK
}

export { checkModeByElementBackground }
