import React from 'react'
import { Button } from 'theme-ui'
import Tooltip from '../Tooltip/Tooltip'

export default function ChildButton({ children, tooltipID, active = false, title, ...props }) {
  const variant = active ? 'active' : 'primary'
  const refTooltipID = `tooltip-${tooltipID}`

  return (
    <>
      <Button
        {...props}
        variant={variant}
        data-tooltip-id={refTooltipID}
        data-tooltip-content={title}
        data-tooltip-place="top"
        className={'child-button'}
      >
        {children}
      </Button>
      {title && title.length > 0 && <Tooltip id={refTooltipID} delayShow={800} offset={20} />}
    </>
  )
}
