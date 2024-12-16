import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeUIProvider } from 'theme-ui'
import { LOG_TAG } from 'constants'
import SemanticAndDecorationButtons from './semantic-component/SemanticComponent'
import { theme } from '../theme'
import { isGitlabSite } from '../utils'

function initializeSemanticButtons(editor, root) {
  console.info(`${LOG_TAG} Initializing Semantic Buttons for: `, root, editor)
  ReactDOM.createRoot(root).render(
    <ThemeUIProvider theme={theme}>
      <SemanticAndDecorationButtons textareaRef={{ current: editor }} />
    </ThemeUIProvider>
  )
}

const observer = new MutationObserver((mutations) => {
  const runnable = isGitlabSite(window.location.href)
  if (!runnable) {
    return
  }
  console.debug(`${LOG_TAG} DOM Mutation Observed runnable=`, runnable)

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (
        node.matches &&
        node.matches(
          '#note_note:not([data-semantic-button-initialized], [type="hidden"]), ' +
            '#note-body:not([data-semantic-button-initialized], [type="hidden"]), ' +
            '#review-note-body:not([data-semantic-button-initialized], [type="hidden"])'
        )
      ) {
        if (node.dataset.semanticButtonInitialized === 'true') {
          return
        }
        node.dataset.semanticButtonInitialized = 'true'

        const root = document.createElement('div')
        node.parentNode.appendChild(root)

        initializeSemanticButtons(node, root)
      }
    })
  })

  const richNode = document.querySelector(
    '[data-testid="content_editor_editablebox"]:not([data-semantic-button-initialized])'
  )
  if (richNode) {
    if (richNode.dataset.semanticButtonInitialized === 'true') {
      return
    }
    richNode.dataset.semanticButtonInitialized = 'true'

    const root = document.createElement('div')
    richNode.appendChild(root)

    initializeSemanticButtons(richNode, root)
    initializeSemanticButtons(richNode)
  }
})

// Start observing the document
observer.observe(document.body, { childList: true, subtree: true })
