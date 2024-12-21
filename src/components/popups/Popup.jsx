/** @jsxImportSource theme-ui */
import React from 'react'
import { Box, Select } from 'theme-ui'
import Footer from '../footers/Footer'
import Header from '../headers/Header'
import Option from '../options/Option'
import Test from '../tests/Test'

const TESTING = true

function Popup() {
  function handleGitPlatformChange(event) {}

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
        <Option title="Import conventional configurations (Comming soon)" description="Comming soon" />
      </>
    )
  }

  return (
    <Box sx={{ p: '20px', width: 'auto', minWidth: TESTING ? '800px' : '380px' }}>
      <Header />
      {TESTING ? <Test /> : renderContent()}
      <Footer />
    </Box>
  )
}

export default Popup
