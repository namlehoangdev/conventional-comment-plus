import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeUIProvider } from 'theme-ui'
import { theme } from '../theme'
import Popup from './popups/Popup'

const container = document.getElementById('app-container')
const root = createRoot(container)
root.render(
  <ThemeUIProvider theme={theme}>
    <Popup />
  </ThemeUIProvider>
)
