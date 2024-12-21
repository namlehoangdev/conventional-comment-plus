import React from 'react'
import { Button } from 'theme-ui'
import { Tooltip } from 'react-tooltip'

export default function ChildButton({ children, active = false, title, id, ...props }) {
  const variant = active ? 'active' : 'primary'

  const tooltipID = `tooltip-${id}`

  return (
    <>
      <Button
        {...props}
        variant={variant}
        data-tooltip-id={tooltipID}
        data-tooltip-content={title}
        data-tooltip-place="top"
      >
        {children}
      </Button>
      {title && title.length > 0 && <Tooltip id={tooltipID} />}
    </>
  )
}
