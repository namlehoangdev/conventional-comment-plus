/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react'
import { Flex, Box, Select, Input } from 'theme-ui'
import Header from '../headers/Header'
import Option from '../options/Option'
import Footer from '../footers/Footer'


function Popup() {



  function handleGitPlatformChange(event) {
  }

  function handleThemeChange(event) {
  }

  return (
    <Box sx={{ p: '14px' }}>
      <Header />

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
            <option disabled={true} value="Github">Github (Coming soon)</option>
            <option disabled={true} value="Bitbucket">Bitbucket (Coming soon)</option>
            <option disabled={true} value="Auto">Auto (Coming soon)</option>
          </Select>
        </Box>
      </Option>

      <Option
        title="Manually change theme"
        description="Manually change theme (Github/Gitlab) if autodetect not working"
      >
        <Box sx={{ mt: '10px' }}>
          <Select
            value={'Light'}
            onChange={handleThemeChange}
            variant="selectInput"
            sx={{
              cursor: 'pointer',
            }}
          >
            <option disabled={true} value="Light">Light</option>
            <option disabled={true} value="Dark">Dark</option>
            <option disabled={true} value="Auto">Auto (Coming soon)</option>
          </Select>
        </Box>
      </Option>
      {/*<Footer />*/}
    </Box>
  )
}

export default Popup
