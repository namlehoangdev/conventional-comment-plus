import {
  SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN,
  SEMANTIC_LABELS,
} from '../constants/conventionalComments'
import { LOG_TAG } from '../constants'

function retrieveConventionalPrefix(inputString) {
  try {
    const match = inputString.match(SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN)
    if (match && match.length > 2) {
      return {
        conventionalPrefix: match[0],
        label: match[1],
        decorations: match[2] ? match[2].split(', ').map((d) => d.trim()) : [],
      }
    } else {
      return null
    }
  } catch (error) {
    console.debug(`${LOG_TAG}-retrieveConventionalPrefix match`, error)
    return null
  }
}

function toggleDecoration(decorations = [], decorationToToggle = '') {
  let newDecorations = [...decorations]
  if (decorationToToggle.length === 0) {
    return newDecorations
  }
  const index = newDecorations.indexOf(decorationToToggle)
  if (index === -1) {
    newDecorations.push(decorationToToggle)
  } else {
    newDecorations.splice(index, 1)
  }
  return newDecorations
}

function genConventionalCommentPrefix(semanticLabel = '', decorations = []) {
  const decoStr =
    decorations && decorations.length > 0 ? `${decorations.join(', ')}` : ''
  return `**${semanticLabel}${decoStr ? ` (${decoStr})` : ''}:**`
}

function getNewData(
  currentText,
  prefixData,
  semanticLabel = '',
  decoration = ''
) {
  const {
    decorations: currentDecorations = [],
    label: currentLabel,
    conventionalPrefix: currentPrefix,
  } = prefixData || {}

  const newSemanticLabel =
    semanticLabel.length > 0 ? semanticLabel : currentLabel

  const validDecorations = SEMANTIC_LABELS[newSemanticLabel.toUpperCase()]
    ? new Set(SEMANTIC_LABELS[newSemanticLabel.toUpperCase()].decorations)
    : new Set()

  let newDecorations =
    decoration.length > 0
      ? toggleDecoration(currentDecorations, decoration)
      : currentDecorations
  newDecorations = newDecorations.filter((decoration) =>
    validDecorations.has(decoration)
  )
  const newPrefix = genConventionalCommentPrefix(
    newSemanticLabel,
    newDecorations
  )
  const newText = currentPrefix
    ? currentText.replace(currentPrefix, newPrefix)
    : `${newPrefix} ${currentText}`
  return { newText, newPrefix, newSemanticLabel, newDecorations }
}

export { retrieveConventionalPrefix, getNewData }
