import React from 'react'
import { Box, Flex, Switch } from 'theme-ui'

export default function Option({ title, description, onChange, checked, showDescription, children }) {
  return (
    <Flex sx={styles.container(showDescription)} title={description}>
      <Flex
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={styles.title}>{title}</Box>
        {onChange && <Switch onChange={onChange} checked={checked} sx={styles.switch} />}
      </Flex>
      {showDescription && <Box sx={styles.description}>{description}</Box>}
      {children}
    </Flex>
  )
}

const styles = {
  container: (showDescription) => ({
    width: '100%',
    flexDirection: 'column',
    mt: showDescription ? '14px' : null,
    pb: showDescription ? null : '14px',
    mb: showDescription ? null : '14px',
  }),
  title: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  switch: {
    m: 0,
    backgroundColor: 'lightGrey',
    width: '36px',
    height: '20px',
    '& > div': {
      width: '16px',
      height: '16px',
    },
    'input:checked ~ &': {
      backgroundColor: 'blue',
    },
  },
  description: {
    fontSize: '12px',
    color: 'darkGrey',
    mt: '6px',
  },
}
