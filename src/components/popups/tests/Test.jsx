import React, { useRef, useState } from 'react'
import { Box, Switch, Textarea } from 'theme-ui'
import Option from '../options/Option'

import SemanticAndDecorationButtons from '../../../content-scripts/semantic-component/SemanticComponent'

export default function Test() {
  const textAreaRef = useRef(null)
  const [textAreaColor, setTextAreaColor] = useState('white')
  const [persistSemantic, setPersistSemantic] = useState(true)

  const styles = {
    optionBox: {
      mt: '10px',
    },
    textAreaBox: {
      position: 'relative',
      // We'll dynamically switch this background below
    },
  }

  function handleChangeTextAreaColor() {
    setTextAreaColor((prevColor) => (prevColor === 'white' ? 'black' : 'white'))
  }

  function handlePersistButtonClick() {
    setPersistSemantic(!persistSemantic)
  }

  return (
    <>
      <Option title="Change theme" description="Manually change theme (Github/Gitlab) if autodetect not working">
        <Box sx={styles.optionBox}>
          <Switch label="Dark mode?" checked={textAreaColor === 'black'} onChange={handleChangeTextAreaColor} />
        </Box>
      </Option>
      <Option title="Change Semantic autohide" description="Persist the semantic on text area">
        <Box sx={styles.optionBox}>
          <Switch label="Persist?" checked={persistSemantic} onChange={handlePersistButtonClick} />
        </Box>
      </Option>
      <Box sx={{ ...styles.textAreaBox, background: textAreaColor }} rows={12} cols={8}>
        <Textarea ref={textAreaRef} defaultValue="Some of the comment" rows={8} cols={12} />
        <SemanticAndDecorationButtons autoHide={!persistSemantic} editorRef={textAreaRef} />
      </Box>
    </>
  )
}
