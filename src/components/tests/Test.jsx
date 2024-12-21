import React, { useRef, useState } from 'react'
import { Box, Switch, Textarea } from 'theme-ui'
import Option from '../options/Option'

import SemanticAndDecorationButtons from '../../content-scripts/semantic-component/SemanticComponent'

function Test() {
  const textAreaRef = useRef(null)
  const [textAreaColor, setTextAreaColor] = useState('white')
  const [persistSemantic, setPersistSemantic] = useState(true)

  function handleChangeTextAreaColor(event) {
    setTextAreaColor(textAreaColor === 'white' ? 'black' : 'white')
  }

  function handlePersistButtonClick() {
    setPersistSemantic(!persistSemantic)
  }

  return (
    <>
      <Option title="Change theme" description="Manually change theme (Github/Gitlab) if autodetect not working">
        <Box sx={{ mt: '10px' }}>
          <Switch label="Dark mode?" checked={textAreaColor === 'black'} onChange={handleChangeTextAreaColor} />
        </Box>
      </Option>
      <Option title="Change Semantic autohide" description="Persist the semantic on text area">
        <Box sx={{ mt: '10px' }}>
          <Switch label="Persist?" checked={persistSemantic} onChange={handlePersistButtonClick} />
        </Box>
      </Option>
      <Box
        sx={{
          position: 'relative',
          background: textAreaColor,
        }}
        rows={12}
        cols={8}
      >
        <Textarea ref={textAreaRef} defaultValue="Some of the comment" rows={8} cols={12} />
        <SemanticAndDecorationButtons autoHide={!persistSemantic} editorRef={textAreaRef} />
      </Box>
    </>
  )
}

export default Test
