import React, { useState } from 'react'
import './SemanticComponent.scss'

import {
  DECORATIONS,
  DECORATIONS_PRIORITIES,
  LABELS,
  SEMANTIC_LABELS_PRIORITIES,
} from '../../constants/conventionalComments.js'
import { genNewData, retrieveConventionalPrefix } from '../../utils/semantic'
import { Box, useColorMode } from 'theme-ui'
import ChildButton from './ChildButton/ChildButton'

export default function SemanticAndDecorationButtons({ test, className, textareaRef, ...props }) {
  const [colorMode, setColorMode] = useColorMode()
  const [activeLabelKey, setActiveLabelKey] = useState(null)
  const [activeDecorationKeys, setActiveDecorationKeys] = useState([])
  const validDecorationKeys = new Set(LABELS[activeLabelKey]?.decorationKeys || [])

  const currentTextarea = textareaRef ? textareaRef.current : null

  function handleLabelClick(event, labelKey, value) {
    event.preventDefault()
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

  function handleDecorationClick(event, decoKey, value) {
    event.preventDefault()
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
    const active = label && activeLabelKey === key
    const disabled = false
    return (
      <ChildButton
        key={key}
        active={active}
        up={true}
        disabled={disabled}
        title={label?.tooltip}
        onClick={(e) => handleLabelClick(e, key, label)}
      >
        {label?.content}
      </ChildButton>
    )
  }

  function renderDecorationButton(key) {
    const decoration = DECORATIONS[key]
    const active = activeDecorationKeys.includes(key)
    const disabled = !validDecorationKeys.has(key)
    return (
      <ChildButton
        key={key}
        active={active}
        up={false}
        disabled={disabled}
        title={decoration?.tooltip}
        onClick={(e) => handleDecorationClick(e, key, decoration)}
      >
        {decoration?.content}
      </ChildButton>
    )
  }

  const testStyle = test ? { opacity: 1 } : undefined
  return (
    <Box {...props} className={`conv-comment-root-${colorMode} ${className}`} style={testStyle}>
      <Box key={'labels'} className={'row-container'}>
        {SEMANTIC_LABELS_PRIORITIES.map(renderLabelButton)}
      </Box>
      <Box key={'labels'} className={'row-container'}>
        {DECORATIONS_PRIORITIES.map(renderDecorationButton)}
      </Box>
    </Box>
  )
}
