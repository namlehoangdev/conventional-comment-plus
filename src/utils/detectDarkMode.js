import tinycolor from 'tinycolor2'
import { ColorModes, LOG_TAG } from 'constants'

function getElementInheritedBackgroundColor(element) {
  const styles = window.getComputedStyle(element)
  let backgroundColor = styles.backgroundColor

  // If the background is transparent, check the parent element
  if (tinycolor(backgroundColor).getAlpha() === 0) {
    const parentElement = element.parentElement
    if (parentElement) {
      backgroundColor = getElementInheritedBackgroundColor(parentElement) // Recursively check the parent
    } else {
      // If no parent or background is transparent all the way up, return a fallback (e.g., white)
      backgroundColor = 'white' // Default background color
    }
  }

  return backgroundColor
}

function checkModeByElementBackground(element) {
  if (!element) {
    return null
  }

  const backgroundColor = getElementInheritedBackgroundColor(element)

  console.log(
    `${LOG_TAG} Detected element background=${backgroundColor} isLight=${tinycolor(backgroundColor).isLight()}`
  )

  return tinycolor(backgroundColor).isLight() ? ColorModes.DEFAULT_LIGHT : ColorModes.DEFAULT_DARK
}

export { checkModeByElementBackground }
