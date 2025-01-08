const SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN = /\*\*(\w+)\s*(?:\(\s*([^)]+?)\s*\))?:\s*\*\*/

// Keys -----
const LABEL_KEY = {
  NITPICK: 'NITPICK',
  SUGGESTION: 'SUGGESTION',
  ISSUE: 'ISSUE',
  QUESTION: 'QUESTION',
  THOUGHT: 'THOUGHT',
  PRAISE: 'PRAISE',
  CHORE: 'CHORE',
}

const DECORATION_KEY = {
  BLOCKING: 'BLOCKING',
  NON_BLOCKING: 'NON_BLOCKING',
  IF_MINOR: 'IF_MINOR',
  UNIT_TEST: 'UNIT_TEST',
  PERFORMANCE: 'PERFORMANCE',
}

// Values ------------------------

const DECORATIONS = {
  [DECORATION_KEY.BLOCKING]: {
    key: DECORATION_KEY.BLOCKING,
    content: 'blocking',
    tooltip: 'Prevents acceptance until resolved.',
    incompatibleWith: [DECORATION_KEY.NON_BLOCKING],
  },
  [DECORATION_KEY.NON_BLOCKING]: {
    key: DECORATION_KEY.NON_BLOCKING,
    content: 'non-blocking',
    tooltip: 'Does not prevent acceptance.',
    incompatibleWith: [DECORATION_KEY.BLOCKING],
  },
  [DECORATION_KEY.IF_MINOR]: {
    key: DECORATION_KEY.IF_MINOR,
    content: 'if-minor',
    tooltip: 'Resolve only if change is minor.',
  },
  [DECORATION_KEY.UNIT_TEST]: {
    key: DECORATION_KEY.UNIT_TEST,
    content: 'unit-test',
    tooltip: 'Related to unit tests.',
  },
  [DECORATION_KEY.PERFORMANCE]: {
    key: DECORATION_KEY.PERFORMANCE,
    content: 'performance',
    tooltip: 'Related to performance.',
  },
}

const LABELS = {
  [LABEL_KEY.NITPICK]: {
    key: LABEL_KEY.NITPICK,
    content: 'nitpick',
    decorationKeys: [
      DECORATION_KEY.BLOCKING,
      DECORATION_KEY.NON_BLOCKING,
      DECORATION_KEY.IF_MINOR,
      DECORATION_KEY.UNIT_TEST,
      DECORATION_KEY.PERFORMANCE,
    ],
    tooltip: 'Small, necessary changes.',
  },
  [LABEL_KEY.SUGGESTION]: {
    key: LABEL_KEY.SUGGESTION,
    content: 'suggestion',
    decorationKeys: [
      DECORATION_KEY.NON_BLOCKING,
      DECORATION_KEY.IF_MINOR,
      DECORATION_KEY.UNIT_TEST,
      DECORATION_KEY.PERFORMANCE,
    ],
    tooltip: 'Proposes improvements for clarity.',
  },
  [LABEL_KEY.ISSUE]: {
    key: LABEL_KEY.ISSUE,
    content: 'issue',
    decorationKeys: [
      DECORATION_KEY.BLOCKING,
      DECORATION_KEY.NON_BLOCKING,
      DECORATION_KEY.IF_MINOR,
      DECORATION_KEY.UNIT_TEST,
      DECORATION_KEY.PERFORMANCE,
    ],
    tooltip: 'Highlights problems needing resolution.',
  },
  [LABEL_KEY.QUESTION]: {
    key: LABEL_KEY.QUESTION,
    content: 'question',
    decorationKeys: [
      DECORATION_KEY.NON_BLOCKING,
      DECORATION_KEY.BLOCKING,
      DECORATION_KEY.IF_MINOR,
      DECORATION_KEY.UNIT_TEST,
      DECORATION_KEY.PERFORMANCE,
    ],
    tooltip: 'Requests clarification.',
  },
  [LABEL_KEY.THOUGHT]: {
    key: LABEL_KEY.THOUGHT,
    content: 'thought',
    decorationKeys: [DECORATION_KEY.NON_BLOCKING, DECORATION_KEY.PERFORMANCE, DECORATION_KEY.UNIT_TEST],
    tooltip: 'Non-blocking idea for exploration.',
  },
  [LABEL_KEY.PRAISE]: {
    key: LABEL_KEY.PRAISE,
    content: 'praise',
    decorationKeys: [DECORATION_KEY.NON_BLOCKING, DECORATION_KEY.PERFORMANCE, DECORATION_KEY.UNIT_TEST],
    tooltip: 'Recognizes positive contributions.',
  },
  [LABEL_KEY.CHORE]: {
    key: LABEL_KEY.CHORE,
    content: 'chore',
    decorationKeys: [
      DECORATION_KEY.BLOCKING,
      DECORATION_KEY.NON_BLOCKING,
      DECORATION_KEY.IF_MINOR,
      DECORATION_KEY.UNIT_TEST,
      DECORATION_KEY.PERFORMANCE,
    ],
    tooltip: 'Routine tasks before acceptance.',
  },
}

// Others-----
const SEMANTIC_LABELS_PRIORITIES = [
  LABEL_KEY.NITPICK,
  LABEL_KEY.SUGGESTION,
  LABEL_KEY.ISSUE,
  LABEL_KEY.QUESTION,
  LABEL_KEY.THOUGHT,
  LABEL_KEY.PRAISE,
  LABEL_KEY.CHORE,
]

const DECORATIONS_PRIORITIES = [
  DECORATION_KEY.BLOCKING,
  DECORATION_KEY.NON_BLOCKING,
  DECORATION_KEY.IF_MINOR,
  DECORATION_KEY.UNIT_TEST,
  DECORATION_KEY.PERFORMANCE,
]

export {
  SEMANTIC_COMMENT_PREFIX_REGEX_PATTERN,
  DECORATIONS_PRIORITIES,
  SEMANTIC_LABELS_PRIORITIES,
  LABELS,
  DECORATIONS,
  LABEL_KEY,
}
