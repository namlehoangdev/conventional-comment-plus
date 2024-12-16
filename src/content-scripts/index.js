import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeUIProvider } from 'theme-ui'
import { LOG_TAG } from 'constants'
import SemanticAndDecorationButtons from './semantic-component/SemanticComponent'
import { theme } from '../theme'
import { isGitlabSite } from '../utils'

function initializeSemanticButtons(targetNode) {
  console.info(`${LOG_TAG} Initializing Semantic Buttons for : `, targetNode)

  if (targetNode.dataset.semanticButtonInitialized === 'true') {
    return
  }
  targetNode.dataset.semanticButtonInitialized = 'true'

  const semanticContainer = targetNode.closest('div')
  if (semanticContainer) {
    // Create a new container for the React root
    const reactRootContainer = document.createElement('div')

    // Append the new container to the semanticContainer
    semanticContainer.appendChild(reactRootContainer)

    // Render the React component into the new container
    ReactDOM.createRoot(reactRootContainer).render(
      <ThemeUIProvider theme={theme}>
        <SemanticAndDecorationButtons textareaRef={{ current: targetNode }} />
      </ThemeUIProvider>
    )
  }
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
          '#note_note:not([data-semantic-button-initialized]), ' +
            '#note-body:not([data-semantic-button-initialized]), ' +
            '#review-note-body:not([data-semantic-button-initialized]), ' +
            '[data-testid="content_editor_editablebox"]:not([data-semantic-button-initialized])'
        )
      ) {
        initializeSemanticButtons(node)
      }
    })
  })
})

// Start observing the document
observer.observe(document.body, { childList: true, subtree: true })
