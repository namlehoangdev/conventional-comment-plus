import React from 'react'
import { Button, useColorMode } from 'theme-ui'
import { Tooltip } from 'react-tooltip'
import './ChildButton.scss'
import { ColorModes } from 'constants'

export default function ChildButton({ children, tooltipID, active = false, title, ...props }) {
  const variant = active ? 'active' : 'primary'
  const refTooltipID = `tooltip-${tooltipID}`

  const [colorMode, setColorMode] = useColorMode(ColorModes.DEFAULT_LIGHT)

  function renderTooltip() {
    if (!title || title.length === 0) {
      return null
    }
    return <Tooltip className={`tooltip-${colorMode}`} id={refTooltipID} delayShow={800} offset={20} />
  }

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
      {renderTooltip()}
    </>
  )
}
