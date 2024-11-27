import React, { useState } from 'react'
import './SemanticComponent.scss'

import { SEMANTIC_LABELS } from '../../constants/conventionalComments.js'
import { getNewData, retrieveConventionalPrefix } from '../../utils/semantic'

export default function SemanticAndDecorationButtons({ textareaRef }) {
  const [activeSemanticLabel, setActiveSemanticLabel] = useState('')
  const [activeDecorations, setActiveDecorations] = useState([])

  const handleSemanticClick = (semanticLabel) => {
    setActiveSemanticLabel(semanticLabel)
    setActiveDecorations([]) // Reset decorations when the semantic label changes

    // Update the textarea (same as before)
    if (textareaRef.current) {
      const currentText = textareaRef.current.value.trim()
      const prefixData = retrieveConventionalPrefix(currentText)
      const newData = getNewData(currentText, prefixData, semanticLabel, '')
      textareaRef.current.value = newData.newText
      textareaRef.current.focus()
      textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  const handleDecorationClick = (decoration) => {
    setActiveDecorations((prevDecorations) =>
      prevDecorations.includes(decoration)
        ? prevDecorations.filter((d) => d !== decoration)
        : [...prevDecorations, decoration]
    )

    // Update the textarea (same as before)
    if (textareaRef.current) {
      const currentText = textareaRef.current.value.trim()
      const prefixData = retrieveConventionalPrefix(currentText)
      const newData = getNewData(
        currentText,
        prefixData,
        activeSemanticLabel,
        decoration
      )
      textareaRef.current.value = newData.newText
      textareaRef.current.focus()
      textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  const validDecorations = new Set(
    SEMANTIC_LABELS[activeSemanticLabel.toUpperCase()]?.decorations || []
  )

  return (
    <div className="conv-comment-root">
      <div className="semantic-buttons-container">
        {Object.keys(SEMANTIC_LABELS).map((semanticLabel) => (
          <button
            key={semanticLabel}
            className={activeSemanticLabel === semanticLabel ? 'active' : ''}
            onClick={() => handleSemanticClick(semanticLabel)}
          >
            {semanticLabel}
          </button>
        ))}
      </div>
      <div className="decoration-buttons-container">
        {Array.from(
          new Set(
            Object.values(SEMANTIC_LABELS).flatMap((label) => label.decorations)
          )
        ).map((decoration) => (
          <button
            key={decoration}
            className={activeDecorations.includes(decoration) ? 'active' : ''}
            onClick={() => handleDecorationClick(decoration)}
            disabled={!validDecorations.has(decoration)}
          >
            {decoration}
          </button>
        ))}
      </div>
    </div>
  )
}
