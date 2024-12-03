import React from 'react'
import { Button } from 'theme-ui'

export default function ChildButton({ children, active = false, ...props }) {
  // Directly use the variant value in JSX
  const variant = active ? 'active' : 'primary'

  return (
    <Button {...props} variant={variant}>
      {children}
    </Button>
  )
}
