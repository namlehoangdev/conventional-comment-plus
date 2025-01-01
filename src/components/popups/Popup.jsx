/** @jsxImportSource theme-ui */
import React from 'react'
import { Box, Select } from 'theme-ui'
import Footer from '../footers/Footer'
import Header from '../headers/Header'
import Option from '../options/Option'
import Test from '../tests/Test'

const TESTING = true

export default function Popup() {
  function handleGitPlatformChange(event) {
    // handle logic here
  }

  function renderContent() {
    return (
      <>
        <Option
          title="Change Git platform"
          description="Manually detect platform (Github/Gitlab) if autodetect not working"
        >
          <Select value="Gitlab" onChange={handleGitPlatformChange} variant="selectInput" sx={styles.select}>
            <option value="Gitlab">Gitlab</option>
            <option disabled value="Github">
              Github (Coming soon)
            </option>
            <option disabled value="Bitbucket">
              Bitbucket (Coming soon)
            </option>
            <option disabled value="Auto">
              Auto (Coming soon)
            </option>
          </Select>
        </Option>
        <Option title="Import conventional configurations (Coming soon)" description="Coming soon" />
      </>
    )
  }

  return (
    <Box
      sx={{
        ...styles.container,
        ...(TESTING ? styles.largeContainer : styles.smallContainer),
      }}
    >
      <Header />
      {TESTING ? <Test /> : renderContent()}
      <Footer />
    </Box>
  )
}

// Extract your styles into a variable
const styles = {
  container: {
    p: '20px',
    width: 'auto',
  },
  largeContainer: {
    minWidth: '800px',
  },
  smallContainer: {
    minWidth: '380px',
  },
  select: {
    mt: '10px',
    cursor: 'pointer',
  },
}
