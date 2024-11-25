const DECORATIONS = Object.freeze({
  BLOCKING: { content: 'blocking', tooltip: 'Prevents acceptance until resolved.' },
  NON_BLOCKING: { content: 'non-blocking', tooltip: 'Does not prevent acceptance.' },
  IF_MINOR: { content: 'if-minor', tooltip: 'Resolve only if change is minor.' },
  UNIT_TEST: { content: 'unit-test', tooltip: 'Related to unit tests.' },
  PERFORMANCE: { content: 'performance', tooltip: 'Related to performance.' },
})

const SEMANTIC_LABELS = Object.freeze({
  NITPICK: {
    content: 'nitpick',
    decorations: new Set([DECORATIONS.BLOCKING.content, DECORATIONS.NON_BLOCKING.content, DECORATIONS.PERFORMANCE.content]),
    tooltip: 'Small, necessary changes.',
  },
  SUGGESTION: {
    content: 'suggestion',
    decorations: new Set([DECORATIONS.NON_BLOCKING.content, DECORATIONS.UNIT_TEST.content]),
    tooltip: 'Proposes improvements for clarity.',
  },
  ISSUE: {
    content: 'issue',
    decorations: new Set([DECORATIONS.BLOCKING.content, DECORATIONS.PERFORMANCE.content]),
    tooltip: 'Highlights problems needing resolution.',
  },
  QUESTION: {
    content: 'question',
    decorations: new Set([DECORATIONS.NON_BLOCKING.content, DECORATIONS.PERFORMANCE.content]),
    tooltip: 'Requests clarification.',
  },
  THOUGHT: {
    content: 'thought',
    decorations: new Set([DECORATIONS.BLOCKING.content, DECORATIONS.NON_BLOCKING.content]),
    tooltip: 'Non-blocking idea for exploration.',
  },
  PRAISE: {
    content: 'praise',
    decorations: new Set([DECORATIONS.NON_BLOCKING.content, DECORATIONS.UNIT_TEST.content]),
    tooltip: 'Recognizes positive contributions.',
  },
  CHORE: {
    content: 'chore',
    decorations: new Set([DECORATIONS.BLOCKING.content, DECORATIONS.NON_BLOCKING.content, DECORATIONS.IF_MINOR.content]),
    tooltip: 'Routine tasks before acceptance.',
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

const SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN = /\*\*(\w+)\s*(?:\(\s*([^)]+?)\s*\))?:\s*\*\*/
const ELEMENT_ROOT_ID = 'conv-comment-root'

export {
  SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN,
  ELEMENT_ROOT_ID,
  DECORATIONS_PRIORITIES,
  SEMANTIC_LABELS_PRIORITIES,
  SEMANTIC_LABELS,
  DECORATIONS,
}