import React from 'react'
import { Flex, NavLink } from 'theme-ui'
import { ExtensionInfo } from '../../constants/extensionInfo'

function Footer(props) {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
      }}
    >
      <Flex sx={{ justifyContent: 'space-around', width: '100%' }}>
        <NavLink href={ExtensionInfo.GITHUB_URL} target="_blank" variant="footer">
          Github
        </NavLink>
        <NavLink href={`mailto:${ExtensionInfo.CONTACT_EMAIL}`} target="_blank" variant="footer">
          Email
        </NavLink>
      </Flex>
    </Flex>
  )
}

export default Footer
