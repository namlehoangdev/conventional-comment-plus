import React from 'react'
import ReactDOM from 'react-dom'
import SemanticAndDecorationButtons from './semantic-component/SemanticComponent'

const initializeSemanticButtons = (targetNode) => {
  console.log('Initializing Semantic Buttons for:', targetNode)

  if (targetNode.dataset.semanticButtonInitialized === 'true') {
    return
  }
  targetNode.dataset.semanticButtonInitialized = 'true'
  
  const semanticContainer = targetNode.closest('div')
  ReactDOM.createRoot(semanticContainer).render(
    <SemanticAndDecorationButtons textareaRef={{ current: targetNode }} />
  )
}

// Observe DOM mutations
const observer = new MutationObserver((mutations) => {
  console.log('DOM Mutated')
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (
        node.matches &&
        node.matches(
          '#note_note:not([data-semantic-button-initialized]), #note-body:not([data-semantic-button-initialized]), #review-note-body:not([data-semantic-button-initialized])'
        )
      ) {
        initializeSemanticButtons(node)
      }
    })
  })
})

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true,
})

// Initial run for existing elements
// document
//   .querySelectorAll(
//     '#note_note:not([data-semantic-button-initialized]), #note-body:not([data-semantic-button-initialized]), #review-note-body:not([data-semantic-button-initialized])'
//   )
//   .forEach(initializeSemanticButtons)
//
//
// setInterval(function () {
//   console.debug(`${LOG_TAG}-interval`)
//   document
//     .querySelectorAll(
//       '#note_note:not([data-semantic-button-initialized]), #note-body:not([data-semantic-button-initialized]), #review-note-body:not([data-semantic-button-initialized])'
//     )
//     .forEach(initializeSemanticButtons)
// }, 500)
