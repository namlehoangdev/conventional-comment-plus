import { Button } from 'theme-ui'
import React from 'react'
import './ChildButton.scss'

export default function ChildButton({ up, children, title, active, ...props }) {
  function getVariant(active) {
    return active ? 'active' : 'primary'
  }

  return (
    <Button {...props} className={'child-button'} variant={getVariant(active)} data-tooltip={title}>
      {children}
    </Button>
  )
}
