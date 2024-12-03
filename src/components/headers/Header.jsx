import React from 'react'
import { Box, Flex, Image } from 'theme-ui'
import logo from '../../assets/icons/logo.svg'

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
      <Flex sx={{ gap: '8px', alignItems: 'center' }}>
        <Image src={logo} alt="Conventional Comment Plus" height="50px" width="50px" />
        <Box sx={{ fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Conventional Comment Plus</Box>
      </Flex>
    </Flex>
  )
}

export default Header
