/** @jsxImportSource theme-ui */
import React, { useRef } from 'react'
import { Box, Divider, Select, Switch, useColorMode } from 'theme-ui'

import SemanticAndDecorationButtons from '../../content-scripts/semantic-component/SemanticComponent'
import { ColorModes } from '../../constants'
import Footer from '../footers/Footer'
import Header from '../headers/Header'
import Option from '../Options/Option'

const TESTING = false

function Popup() {
  const textAreaRef = useRef(null)
  const [colorMode, setColorMode] = useColorMode()

  function handleGitPlatformChange(event) {}

  function handleThemeChange(event) {
    const newColor = colorMode === ColorModes.DEFAULT_LIGHT ? ColorModes.DEFAULT_DARK : ColorModes.DEFAULT_LIGHT
    setColorMode(newColor)
  }

  function renderTestArea() {
    return (
      <>
        <Option title="Change theme" description="Manually change theme (Github/Gitlab) if autodetect not working">
          <Box sx={{ mt: '10px' }}>
            <Switch label="Dark mode?" checked={colorMode === ColorModes.DEFAULT_DARK} onChange={handleThemeChange} />
          </Box>
        </Option>
        <Divider />
        <textarea
          ref={textAreaRef}
          rows="5"
          cols="30"
          placeholder="Enter text here..."
          style={{ marginBottom: '50px' }}
        />
        <SemanticAndDecorationButtons test={false} textareaRef={textAreaRef} style={{ marginBottom: '20px' }} />
      </>
    )
  }

  function renderContent() {
    return (
      <>
        <Option
          title="Change Git platform"
          description="Manually detect platform (Github/Gitlab) if autodetect not working"
        >
          <Select
            value={'Gitlab'}
            onChange={handleGitPlatformChange}
            variant="selectInput"
            sx={{
              mt: '10px',
              cursor: 'pointer',
            }}
          >
            <option value="Gitlab">Gitlab</option>
            <option disabled={true} value="Github">
              Github (Coming soon)
            </option>
            <option disabled={true} value="Bitbucket">
              Bitbucket (Coming soon)
            </option>
            <option disabled={true} value="Auto">
              Auto (Coming soon)
            </option>
          </Select>
        </Option>
      </>
    )
  }

  return (
    <Box sx={{ p: '20px', width: 'auto', minWidth: TESTING ? '2000px' : '380px' }}>
      <Header />
      {TESTING ? renderTestArea() : renderContent()}
      <Footer />
    </Box>
  )
}

export default Popup
