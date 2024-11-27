import React, { useState } from 'react'
import './SemanticComponent.scss'

import {
  DECORATIONS,
  DECORATIONS_PRIORITIES,
  LABELS,
  SEMANTIC_LABELS_PRIORITIES,
} from '../../constants/conventionalComments.js'
import { genNewData, retrieveConventionalPrefix } from '../../utils/semantic'

const activeClassName = 'active'

export default function SemanticAndDecorationButtons({ className, textareaRef, ...props }) {
  const [activeLabelKey, setActiveLabelKey] = useState(null)
  const [activeDecorationKeys, setActiveDecorationKeys] = useState([])
  const validDecorationKeys = new Set(LABELS[activeLabelKey]?.decorationKeys || [])

  const currentTextarea = textareaRef ? textareaRef.current : null

  function handleLabelClick(labelKey, value) {
    if (activeLabelKey === labelKey && labelKey?.length > 0 && currentTextarea) {
      setActiveLabelKey(null)
      setActiveDecorationKeys([])
      updateTextArea('')
      return
    }

    if (currentTextarea) {
      const currentText = currentTextarea.value.trim()
      const prefixData = retrieveConventionalPrefix(currentText)
      const { text, decorations, label } = genNewData(currentText, prefixData, labelKey, '')

      setActiveLabelKey(label.key)
      setActiveDecorationKeys(decorations.map((obj) => obj.key))

      updateTextArea(text)
    }
  }

  const handleDecorationClick = (decoKey, value) => {
    if (currentTextarea) {
      const currentText = currentTextarea.value.trim()
      const prefixData = retrieveConventionalPrefix(currentText)

      const { text, decorations, label } = genNewData(currentText, prefixData, activeLabelKey, decoKey)

      setActiveLabelKey(label?.key)
      setActiveDecorationKeys(decorations.map((obj) => obj.key))

      updateTextArea(text)
    }
  }

  function updateTextArea(text) {
    currentTextarea.value = text
    currentTextarea.focus()
    currentTextarea.dispatchEvent(new Event('input', { bubbles: true }))
  }

  function renderLabelButton(key) {
    const label = LABELS[key]
    return (
      <button
        key={key}
        className={activeLabelKey === key && label ? activeClassName : ''}
        onClick={() => handleLabelClick(key, label)}
      >
        {label?.content}
      </button>
    )
  }

  function renderDecorationButton(key) {
    const decoration = DECORATIONS[key]

    return (
      <button
        key={key}
        className={activeDecorationKeys.includes(key) ? activeClassName : ''}
        disabled={!validDecorationKeys.has(key)}
        onClick={() => handleDecorationClick(key, decoration)}
      >
        {decoration?.content}
      </button>
    )
  }

  return (
    <div className={`conv-comment-root ${className}`} {...props}>
      <div className="row-container">{SEMANTIC_LABELS_PRIORITIES.map(renderLabelButton)}</div>
      <div className="row-container">{DECORATIONS_PRIORITIES.map(renderDecorationButton)}</div>
    </div>
  )
}
