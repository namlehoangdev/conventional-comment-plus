import React from 'react'
import { Flex, Link } from 'theme-ui'

const Footer = () => {
  return (
    <Flex
      sx={{
        fontSize: '12px',
        color: 'darkGrey',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flex sx={{ justifyContent: 'space-around', width: '100%' }}>
        <Link
          href="https://github.com/namlehoangdev/conventional-comment-plus"
          target="_blank"
          variant="footer"
        >
          Github
        </Link>
        <Link
          href="mailto:contact@namlehoangdev.com"
          target="_blank"
          variant="footer"
        >
          Email
        </Link>
      </Flex>
    </Flex>
  )
}

export default Footer
