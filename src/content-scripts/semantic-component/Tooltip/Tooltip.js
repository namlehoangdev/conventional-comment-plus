import React from 'react'
import { useColorMode } from 'theme-ui'
import { ColorModes } from 'constants'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './Tooltip.scss'

export default function Tooltip({ className, ...props }) {
  const [colorMode] = useColorMode(ColorModes.DEFAULT_LIGHT)

  return <ReactTooltip className={`tooltip-${colorMode} ${className}`} {...props} />
}
