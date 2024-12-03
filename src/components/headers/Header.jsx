import React from 'react'
import { Box, Flex, Image } from 'theme-ui'
import logo from '../../assets/icons/icon128'

function Header(props) {
  return (
    <Flex
      sx={{
        pb: '14px',
        mb: '14px',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Flex sx={{ gap: '8px', alignItems: 'center' }}>
        <Image src={logo} alt="Conventional Comment Plus" height="50px" width="50px" />
        <Box sx={{ fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Conventional Comment Plus</Box>
      </Flex>
    </Flex>
  )
}

export default Header
