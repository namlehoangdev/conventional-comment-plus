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
        <script
          data-coffee-color="#ffffff"
          data-color="#FFDD00"
          data-emoji="☕"
          data-font="Cookie"
          data-font-color="#000000"
          data-name="bmc-button"
          data-outline-color="#000000"
          data-slug="namlehoangdev"
          data-text="Buy me a coffee"
          src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
          type="text/javascript"
        />
      </Flex>
    </Flex>
  )
}

export default Footer
