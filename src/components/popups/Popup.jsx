/** @jsxImportSource theme-ui */
import React, { useRef } from 'react'
import { Box, Button, Divider, Select, useColorMode } from 'theme-ui'
import SemanticAndDecorationButtons from '../../content-scripts/semantic-component/SemanticComponent'
import Footer from '../footers/Footer'
import Header from '../headers/Header'
import Option from '../Options/Option'

function Popup() {
  const textAreaRef = useRef(null)
  const [colorMode, setColorMode] = useColorMode('light')
  const test = false

  function handleGitPlatformChange(event) {}

  function handleThemeChange(event) {
    setColorMode(event.target.value)
  }

  function renderTestArea() {
    return (
      <>
        <Button
          onClick={(e) => {
            setColorMode(colorMode === 'light' ? 'dark' : 'light')
          }}
        >
          Change theme
        </Button>
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
          <Box sx={{ mt: '10px' }}>
            <Select
              value={'Gitlab'}
              onChange={handleGitPlatformChange}
              variant="selectInput"
              sx={{
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
          </Box>
        </Option>

        <Option title="Change theme" description="Manually change theme (Github/Gitlab) if autodetect not working">
          <Box sx={{ mt: '10px' }}>
            <Select
              value={colorMode}
              onChange={handleThemeChange}
              variant="selectInput"
              sx={{
                cursor: 'pointer',
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </Box>
        </Option>
      </>
    )
  }

  return (
    <Box sx={{ p: '20px', width: 'auto', minWidth: test ? '2000px' : '350px' }}>
      <Header />
      {test ? renderTestArea() : renderContent()}
      <Footer />
    </Box>
  )
}

export default Popup
