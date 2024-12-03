import React from 'react'
import { Flex, NavLink } from 'theme-ui'

const Footer = () => {
  return (
    <Flex
      sx={{
        fontSize: '12px',
        color: 'darkGrey',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
      }}
    >
      <Flex sx={{ justifyContent: 'space-around', width: '100%' }}>
        <NavLink href="https://github.com/namlehoangdev/conventional-comment-plus" target="_blank" variant="footer">
          Github
        </NavLink>
        <NavLink href="mailto:contact@namlehoangdev.com" target="_blank" variant="footer">
          Email
        </NavLink>
      </Flex>
    </Flex>
  )
}

export default Footer
