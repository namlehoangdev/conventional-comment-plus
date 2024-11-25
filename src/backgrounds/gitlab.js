// import { LOG_TAG } from 'constants'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import SemanticAndDecorationButtons from '../components/semantic-component/SemanticComponent'
//
// console.debug(`${LOG_TAG}-DKM`)
//
// const initializeSemanticButtons = (targetNode) => {
//   console.debug(`${LOG_TAG}-initialize`)
//
//   // Prevent duplicate initialization
//   if (targetNode.dataset.semanticButtonInitialized === 'true') return
//
//   targetNode.dataset.semanticButtonInitialized = 'true'
//
//   const rootDiv = document.createElement('div')
//   rootDiv.style.width = '100px'
//   rootDiv.style.height = '100px'
//   rootDiv.style.backgroundColor = 'red'
//   rootDiv.className = 'semantic-button-root'
//   targetNode.appendChild(rootDiv)
//
//   // Render React component
//   ReactDOM.createRoot(rootDiv).render(<SemanticAndDecorationButtons textareaRef={{ current: targetNode }} />)
// }
//
// // Observe DOM mutations
// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.addedNodes) {
//       mutation.addedNodes.forEach((node) => {
//         if (
//           node.matches &&
//           node.matches(
//             '#note_note:not([data-semantic-button-initialized]), #note-body:not([data-semantic-button-initialized]), #review-note-body:not([data-semantic-button-initialized])',
//           )
//         ) {
//           initializeSemanticButtons(node)
//         }
//       })
//     }
//   })
// })
//
// // Start observing the document
// observer.observe(document.body, {
//   childList: true,
//   subtree: true,
// })
//
//
// setInterval(function() {
//   console.debug(`${LOG_TAG}-interval`)
//   document
//     .querySelectorAll(
//       '#note_note:not([data-semantic-button-initialized]), #note-body:not([data-semantic-button-initialized]), #review-note-body:not([data-semantic-button-initialized])',
//     )
//     .forEach(initializeSemanticButtons)
// }, 500)
//
//
// import 'webpack-dev-server/client?https://localhost:3000/ws';
//
//
// setInterval(function(){
//   console.log("DKM")
// },100)