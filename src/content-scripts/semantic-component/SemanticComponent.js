import React, { useCallback, useEffect, useState } from 'react'
import './SemanticComponent.scss'
import { Box, useColorMode } from 'theme-ui'
import { ColorModes, DECORATIONS, DECORATIONS_PRIORITIES, LABELS, LOG_TAG, SEMANTIC_LABELS_PRIORITIES } from 'constants'
import { checkModeByElementBackground, genNewData, retrieveConventionalPrefix } from 'utils'
import ChildButton from './ChildButton/ChildButton'

const SemanticLabels = LABELS
const Decorations = DECORATIONS
const LabelPriorityOrder = SEMANTIC_LABELS_PRIORITIES
const DecorationPriorityOrder = DECORATIONS_PRIORITIES

const updateTextArea = (textareaElement, text) => {
  if (!textareaElement) return
  textareaElement.value = text
  textareaElement.focus()
}

export default function SemanticAndDecorationButtons({ test, textareaRef, ...props }) {
  const [activeLabelKey, setActiveLabelKey] = useState(null)
  const [activeDecorationKeys, setActiveDecorationKeys] = useState(new Set())
  const validDecorationKeys = new Set(LABELS[activeLabelKey]?.decorationKeys || [])
  const textareaElement = textareaRef?.current

  const [colorMode, setColorMode] = useColorMode(ColorModes.DEFAULT_LIGHT)

  useEffect(() => {
    if (textareaElement) {
      const elemColorMode = checkModeByElementBackground(textareaElement)
      if (!elemColorMode) {
        return
      }

      if (elemColorMode !== colorMode) {
        console.debug(`${LOG_TAG} Auto change colorMode from ${colorMode} to ${elemColorMode}`)
        setColorMode(elemColorMode)
      }
    }
  }, [textareaElement, colorMode])

  // Handle the label click event
  const onLabelClick = useCallback(
    (event, labelKey) => {
      event.preventDefault()
      if (activeLabelKey === labelKey && labelKey?.length > 0 && textareaElement) {
        setActiveLabelKey(null)
        setActiveDecorationKeys(new Set())
        updateTextArea(textareaElement, '')
        return
      }

      if (textareaElement) {
        const currentText = textareaElement.value.trim()
        const prefixData = retrieveConventionalPrefix(currentText)
        const { text, decorations, label } = genNewData(currentText, prefixData, labelKey, '')

        setActiveLabelKey(label.key || null)
        setActiveDecorationKeys(new Set(decorations.map((obj) => obj.key)))
        updateTextArea(textareaElement, text)
      }
    },
    [activeLabelKey, textareaElement]
  )

  // Handle decoration click event
  const onDecorationClick = useCallback(
    (event, decoKey) => {
      event.preventDefault()
      if (textareaElement) {
        const currentText = textareaElement.value.trim()
        const prefixData = retrieveConventionalPrefix(currentText)
        const { text, decorations, label } = genNewData(currentText, prefixData, activeLabelKey, decoKey)

        setActiveLabelKey(label?.key)
        setActiveDecorationKeys(new Set(decorations.map((obj) => obj.key)))
        updateTextArea(textareaElement, text)
      }
    },
    [activeLabelKey, textareaElement]
  )

  // Render label buttons
  const renderLabelButton = useCallback(
    (key) => {
      const label = SemanticLabels[key]
      const active = label && activeLabelKey === key
      const disabled = !label
      return (
        <ChildButton
          key={key}
          active={active}
          up={true}
          disabled={disabled}
          title={label?.tooltip}
          onClick={(e) => onLabelClick(e, key)}
        >
          {label?.content}
        </ChildButton>
      )
    },
    [activeLabelKey, onLabelClick]
  )

  // Render decoration buttons
  const renderDecorationButton = useCallback(
    (key) => {
      const decoration = Decorations[key]
      const active = activeDecorationKeys.has(key)
      const disabled = !validDecorationKeys.has(key)
      return (
        <ChildButton
          key={key}
          up={false}
          active={active}
          disabled={disabled}
          title={decoration?.tooltip}
          onClick={(e) => onDecorationClick(e, key)}
        >
          {decoration?.content}
        </ChildButton>
      )
    },
    [activeDecorationKeys, onDecorationClick, validDecorationKeys]
  )

  const visibilityStyle = test ? { opacity: 1 } : undefined

  return (
    <Box {...props} className={`conv-comment-root-${colorMode}`} style={visibilityStyle}>
      <Box className={'row-container'}>{LabelPriorityOrder.map(renderLabelButton)}</Box>
      <Box className={'row-container'}>{DecorationPriorityOrder.map(renderDecorationButton)}</Box>
    </Box>
  )
}
