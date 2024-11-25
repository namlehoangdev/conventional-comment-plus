import React from 'react'
import { Flex, Box, Image } from 'theme-ui'
import logo from 'assets/icons/logo.svg'

const Header = () => {
  return (
    <Flex
      sx={{
        pb: '14px',
        mb: '14px',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'borderGrey',
      }}
    >
      <Flex sx={{ gap: '8px' }}>
        <Image src={logo} alt="Conventional Comment Plus" height="20" width="20" />
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Conventional Comment Plus
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
