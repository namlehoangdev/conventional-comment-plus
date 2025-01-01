import React from 'react'
import { Button } from 'theme-ui'
import { Tooltip } from 'react-tooltip'
import './ChildButton.scss'

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
        className={'child-button'}
      >
        {children}
      </Button>
      {title && title.length > 0 && (
        <Tooltip className={'tooltip'} id={tooltipID} delayShow={800} opacity={1} offset={20} />
      )}
    </>
  )
}
