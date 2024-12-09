import React from 'react'
import { Avatar, Box, Button, Divider, Flex, Label, NavLink } from 'theme-ui'
import { ExtensionInfo } from '../../constants/extensionInfo'
import buyMeACoffeeLogo from '../../assets/icons/buyMeACoffee'
import githubLogo from '../../assets/icons/github'

function Footer(props) {
  const handleBuyMeACoffeeClick = () => {
    window.open(ExtensionInfo.BUY_ME_A_COFFEE_LINK, '_blank')
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        width: '100%',
      }}
    >
      <Divider sx={{ marginY: '20px' }} />
      <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
        <NavLink href={ExtensionInfo.GITHUB_URL} target="_blank" variant="footer">
          <Flex sx={{ alignItems: 'center' }}>
            <Avatar src={githubLogo} sx={{ minWidth: '30px', minHeight: '30px', marginRight: '5px' }} />
            <Label>Github</Label>
          </Flex>
        </NavLink>
        <Button sx={{ background: '#F7DC4B' }} onClick={handleBuyMeACoffeeClick}>
          <Flex sx={{ alignItems: 'center' }}>
            <Avatar src={buyMeACoffeeLogo} sx={{ width: '30px', height: '30px', marginRight: '5px' }} />
            <Label>Buy me a cofee</Label>
          </Flex>
        </Button>
      </Flex>
    </Box>
  )
}

export default Footer
