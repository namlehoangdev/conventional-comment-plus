import { DECORATIONS, LABELS, SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN } from '../constants/conventionalComments'
import { LOG_TAG } from '../constants'

function retrieveConventionalPrefix(inputString) {
  try {
    const match = inputString.match(SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN)
    if (match && match.length > 2) {
      return {
        conventionalPrefix: match[0],
        labelContent: match[1],
        decorationContents: match[2] ? match[2].split(', ').map((d) => d.trim()) : [],
      }
    } else {
      return null
    }
  } catch (error) {
    console.debug(`${LOG_TAG}-retrieveConventionalPrefix match`, error)
    return null
  }
}

function genConventionalCommentPrefix(semanticLabel = '', decorations = []) {
  const decoStr = decorations && decorations.length > 0 ? `${decorations.join(', ')}` : ''
  return `**${semanticLabel}${decoStr ? ` (${decoStr})` : ''}:**`
}

function genNewData(currentText, prefixData, labelKey = '', decorationKey = '') {
  const {
    decorationContents: currentDecorationContents = [],
    labelContent,
    conventionalPrefix: currentPrefix,
  } = prefixData || {}

  const newLabelContent = labelKey.length > 0 ? LABELS[labelKey]?.content : labelContent
  const label = getObjectByContent(LABELS, newLabelContent)

  const validDecorationKeys = label ? new Set(label.decorationKeys) : new Set()

  let newDecorationContents =
    decorationKey.length > 0
      ? toggleDecorationContent(currentDecorationContents, DECORATIONS[decorationKey]?.content)
      : currentDecorationContents

  let decorations = []
  newDecorationContents = newDecorationContents.filter((content) => {
    const decoObj = getObjectByContent(DECORATIONS, content)
    if (validDecorationKeys.has(decoObj?.key)) {
      decorations = [...decorations, decoObj]
      return true
    }
    return false
  })
  const newPrefix = genConventionalCommentPrefix(newLabelContent, newDecorationContents)
  const newText = currentPrefix ? currentText.replace(currentPrefix, newPrefix) : `${newPrefix} ${currentText}`
  return { text: newText, prefix: newPrefix, label, decorations }
}

function toggleDecorationContent(decorationContents = [], decorationContentToToggle = '') {
  let newDecorations = [...decorationContents]
  if (decorationContentToToggle.length === 0) {
    return newDecorations
  }
  const index = newDecorations.indexOf(decorationContentToToggle)
  if (index === -1) {
    newDecorations.push(decorationContentToToggle)
  } else {
    newDecorations.splice(index, 1)
  }
  return newDecorations
}

function getObjectByContent(obj, contentValue) {
  for (const key in obj) {
    if (obj[key]?.content === contentValue) {
      return obj[key]
    }
  }
  return null
}

export { retrieveConventionalPrefix, genNewData, getObjectByContent }
