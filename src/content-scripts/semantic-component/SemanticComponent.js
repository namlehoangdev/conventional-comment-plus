import React, { useCallback, useEffect, useState } from 'react'
import './SemanticComponent.scss'
import { Box, useColorMode } from 'theme-ui'
import { ColorModes, DECORATIONS, DECORATIONS_PRIORITIES, LABELS, LOG_TAG, SEMANTIC_LABELS_PRIORITIES } from 'constants'
import { checkModeByElementBackground, genNewData, retrieveConventionalPrefix } from 'utils'
import ChildButton from './ChildButton/ChildButton'
import Tooltip from './Tooltip/Tooltip'

const SemanticLabels = LABELS
const Decorations = DECORATIONS
const LabelPriorityOrder = SEMANTIC_LABELS_PRIORITIES
const DecorationPriorityOrder = DECORATIONS_PRIORITIES

function editableNode(node) {
  switch (node?.nodeName) {
    case 'textarea': {
      return {
        getValue: () => {
          return node.value
        },
        setValueAndFocus: (val) => {
          node.value = val
          node.focus()
        },
      }
    }
    default: {
      return {
        getValue: () => {
          return node.innerText
        },
        setValueAndFocus: (val) => {
          node.innerText = val
          node.focus()
        },
      }
    }
  }
}

export default function SemanticAndDecorationButtons({ autoHide = true, unsupportedMessage, editorRef, ...props }) {
  const [activeLabelKey, setActiveLabelKey] = useState(null)
  const [activeDecorationKeys, setActiveDecorationKeys] = useState(new Set())
  const validDecorationKeys = new Set(LABELS[activeLabelKey]?.decorationKeys || [])
  const editorElem = editorRef?.current
  const contentNode = editableNode(editorElem)

  const [colorMode, setColorMode] = useColorMode(ColorModes.DEFAULT_LIGHT)

  useEffect(() => {
    if (editorElem) {
      const elemColorMode = checkModeByElementBackground(editorElem)
      if (!elemColorMode) {
        return
      }

      if (elemColorMode !== colorMode) {
        console.debug(`${LOG_TAG} Auto change colorMode from ${colorMode} to ${elemColorMode}`)
        setColorMode(elemColorMode)
      }
    }
  }, [editorElem, colorMode])

  // Handle the label click event
  const onLabelClick = useCallback(
    (event, labelKey) => {
      console.log('button clicked')
      event.preventDefault()
      if (activeLabelKey === labelKey && labelKey?.length > 0 && editorElem) {
        setActiveLabelKey(null)
        setActiveDecorationKeys(new Set())
        contentNode && contentNode.setValueAndFocus('')
        return
      }

      if (editorElem) {
        const currentText = contentNode.getValue().trim()
        const prefixData = retrieveConventionalPrefix(currentText)
        const { text, decorations, label } = genNewData(currentText, prefixData, labelKey, '')

        setActiveLabelKey(label.key || null)
        setActiveDecorationKeys(new Set(decorations.map((obj) => obj.key)))
        contentNode && contentNode.setValueAndFocus(text)
      }
    },
    [activeLabelKey, editorElem]
  )

  // Handle decoration click event
  const onDecorationClick = useCallback(
    (event, decoKey) => {
      event.preventDefault()
      if (editorElem) {
        const currentText = contentNode.getValue().trim()
        const prefixData = retrieveConventionalPrefix(currentText)
        const { text, decorations, label } = genNewData(currentText, prefixData, activeLabelKey, decoKey)

        setActiveLabelKey(label?.key)
        setActiveDecorationKeys(new Set(decorations.map((obj) => obj.key)))
        contentNode && contentNode.setValueAndFocus(text)
      }
    },
    [activeLabelKey, editorElem]
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
          tooltipID={key}
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
          id={key}
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

  const autoHideClassName = autoHide ? undefined : 'conv-comment-buttons-appear'
  const isUnSupported = unsupportedMessage && unsupportedMessage.length > 0
  const themeClassname = isUnSupported ? `conv-comment-root-${colorMode}-unsupported` : `conv-comment-root-${colorMode}`
  const semanticComponentTooltipRef = 'conv-comment-root-tooltip-id'

  return (
    <>
      <Box
        {...props}
        className={`${themeClassname} ${autoHideClassName}`}
        data-tooltip-id={semanticComponentTooltipRef}
        data-tooltip-content={unsupportedMessage}
        data-tooltip-place="top"
      >
        <Box className={'row-container'}>{LabelPriorityOrder.map(renderLabelButton)}</Box>
        <Box className={'row-container'}>{DecorationPriorityOrder.map(renderDecorationButton)}</Box>
      </Box>
      {isUnSupported && <Tooltip id={semanticComponentTooltipRef} delayShow={200} offset={20} />}
    </>
  )
}
