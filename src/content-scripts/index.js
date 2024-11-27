const LOG_TAG = 'CCE'

const DECORATIONS = Object.freeze({
  BLOCKING: {
    content: 'blocking',
    tooltip:
      'Comment with this decoration should prevent the subject under review from being accepted until it is resolved.',
  },
  NON_BLOCKING: {
    content: 'non-blocking',
    tooltip:
      'Comment with this decoration should not prevent the subject under review from being accepted.',
  },
  IF_MINOR: {
    content: 'if-minor',
    tooltip:
      'This decoration gives some freedom to the author; they should resolve the comment only if the changes end up being minor or trivial.',
  },
  UNIT_TEST: {
    content: 'unit-test',
    tooltip:
      'Comment with this decoration suggests something related to unit tests.',
  },
  PERFORMANCE: {
    content: 'performance',
    tooltip:
      'Comment with this decoration suggests something related to performance.',
  },
})

const SEMANTIC_LABELS = Object.freeze({
  NITPICK: {
    content: 'nitpick',
    decorations: new Set([
      DECORATIONS.BLOCKING.content,
      DECORATIONS.NON_BLOCKING.content,
      DECORATIONS.PERFORMANCE.content,
    ]),
    tooltip:
      'Nitpicks are small, trivial, but necessary changes. Distinguishing nitpick comments significantly helps direct the reader’s attention to comments requiring more involvement.',
  },
  SUGGESTION: {
    content: 'suggestion',
    decorations: new Set([
      DECORATIONS.NON_BLOCKING.content,
      DECORATIONS.UNIT_TEST.content,
    ]),
    tooltip:
      'Suggestions propose improvements to the current subject. It’s important to be explicit and clear on what is being suggested and why it is an improvement. Consider using patches and the blocking or non-blocking decorations to further communicate your intent.',
  },
  ISSUE: {
    content: 'issue',
    decorations: new Set([
      DECORATIONS.BLOCKING.content,
      DECORATIONS.PERFORMANCE.content,
    ]),
    tooltip:
      'Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a suggestion. If you are not sure if a problem exists or not, consider leaving a question.',
  },
  QUESTION: {
    content: 'question',
    decorations: new Set([
      DECORATIONS.NON_BLOCKING.content,
      DECORATIONS.PERFORMANCE.content,
    ]),
    tooltip:
      "Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.",
  },
  THOUGHT: {
    content: 'thought',
    decorations: new Set([
      DECORATIONS.BLOCKING.content,
      DECORATIONS.NON_BLOCKING.content,
    ]),
    tooltip:
      'Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.',
  },
  PRAISE: {
    content: 'praise',
    decorations: new Set([
      DECORATIONS.NON_BLOCKING.content,
      DECORATIONS.UNIT_TEST.content,
    ]),
    tooltip:
      'Praises highlight something positive. Try to leave at least one of these comments per review (if it exists :^).',
  },
  CHORE: {
    content: 'chore',
    decorations: new Set([
      DECORATIONS.BLOCKING.content,
      DECORATIONS.NON_BLOCKING.content,
      DECORATIONS.IF_MINOR.content,
    ]),
    tooltip:
      "Chores are simple tasks that must be done before the subject can be 'officially' accepted/merged. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.",
  },
})

const SEMANTIC_LABELS_PRIORITIES = [
  SEMANTIC_LABELS.NITPICK,
  SEMANTIC_LABELS.SUGGESTION,
  SEMANTIC_LABELS.ISSUE,
  SEMANTIC_LABELS.QUESTION,
  SEMANTIC_LABELS.THOUGHT,
  SEMANTIC_LABELS.PRAISE,
  SEMANTIC_LABELS.CHORE,
]

const DECORATIONS_PRIORITIES = [
  DECORATIONS.BLOCKING,
  DECORATIONS.NON_BLOCKING,
  DECORATIONS.IF_MINOR,
  DECORATIONS.UNIT_TEST,
  DECORATIONS.PERFORMANCE,
]

const SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN =
  /\*\*(\w+)\s*(?:\(\s*([^)]+?)\s*\))?:\s*\*\*/
const ELEMENT_ROOT_ID = 'conv-comment-root'

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

const renderRoot = (textarea) => {
  try {
    const rootElem = document.createElement('div')
    rootElem.id = ELEMENT_ROOT_ID

    // Generate Semantic Buttons
    const semanticBtnContainer = document.createElement('div')
    semanticBtnContainer.classList.add('semantic-buttons-container')
    semanticBtnContainer.append(
      ...SEMANTIC_LABELS_PRIORITIES.map((semanticLabel) => {
        const btn = document.createElement('button')
        btn.textContent = semanticLabel.content
        btn.title = semanticLabel.tooltip
        btn.addEventListener('click', (event) => {
          event.preventDefault()
          const currentText = (textarea.value || '').trim()
          const prefixData = retrieveConventionalPrefix(currentText)
          const newData = getNewData(
            currentText,
            prefixData,
            semanticLabel.content,
            ''
          )
          reRenderAllButtons(rootElem, newData)
          textarea.value = newData.newText
          textarea.focus()
          textarea.dispatchEvent(new Event('input', { bubbles: true }))
        })
        return btn
      })
    )
    rootElem.append(semanticBtnContainer)

    // Generate Decoration Buttons
    const decoBtnContainer = document.createElement('div')
    decoBtnContainer.classList.add('decoration-buttons-container')
    decoBtnContainer.append(
      ...DECORATIONS_PRIORITIES.map((decoration) => {
        const btn = document.createElement('button')
        btn.textContent = decoration.content
        btn.title = decoration.tooltip
        btn.disabled = true
        btn.addEventListener('click', (event) => {
          event.preventDefault()
          const currentText = (textarea.value || '').trim()
          const prefixData = retrieveConventionalPrefix(currentText)
          const newData = getNewData(
            currentText,
            prefixData,
            '',
            decoration.content
          )
          reRenderAllButtons(rootElem, newData)
          textarea.value = newData.newText
          textarea.focus()
          textarea.dispatchEvent(new Event('input', { bubbles: true }))
        })
        return btn
      })
    )
    rootElem.appendChild(decoBtnContainer)

    const parent = textarea.closest('div')
    parent && parent.appendChild(rootElem)
  } catch (error) {
    console.error(`${LOG_TAG}-renderRoot`, error)
  }
}

setInterval(function () {
  console.debug(`${LOG_TAG}-interval`)
  document
    .querySelectorAll(
      '#note_note:not([data-semantic-button-initialized]), #note-body:not([data-semantic-button-initialized]), #review-note-body:not([data-semantic-button-initialized])'
    )
    .forEach(function (note) {
      note.dataset.semanticButtonInitialized = 'true'
      renderRoot(note)
    })
}, 500)

function reRenderAllButtons(rootElem, nextData) {
  const labelButtons = rootElem.querySelectorAll(
    '.semantic-buttons-container button'
  )
  const decorationButtons = rootElem.querySelectorAll(
    '.decoration-buttons-container button'
  )
  const { newSemanticLabel = '', newDecorations = [] } = nextData || {}
  if (labelButtons && labelButtons.length > 0) {
    labelButtons.forEach((btn) => {
      btn.textContent.trim() === newSemanticLabel
        ? btn.classList.add('active')
        : btn.classList.remove('active')
    })
  }

  const validDecorations = SEMANTIC_LABELS[newSemanticLabel.toUpperCase()]
    ? new Set(SEMANTIC_LABELS[newSemanticLabel.toUpperCase()].decorations)
    : new Set()

  if (decorationButtons && decorationButtons.length > 0) {
    decorationButtons.forEach((btn) => {
      const btnContent = btn.textContent.trim()
      newDecorations.includes(btnContent)
        ? btn.classList.add('active')
        : btn.classList.remove('active')
      btn.disabled = !validDecorations.has(btnContent)
    })
  }
}

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
