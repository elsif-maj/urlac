import { useState } from "react"
import audioChatConnect from "../services/audioChat"
import {
  Tooltip,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

const AudioChatButton = () => {
  const [urlacIsOn, setUrlacIsOn] = useState(false)
  const [pc, setPc] = useState()
  const [ws, setWs] = useState()

  const handleAudioChatToggleButton = (e) => {
    e.preventDefault()

    audioChatConnect(
      urlacIsOn,
      setUrlacIsOn,
      pc, 
      setPc,
      ws,
      setWs
    )
  }

  return (
    // O.g.:
    // <button onClick={handleAudioChatToggleButton}>
    //   Audio Chat
    // </button>

    <Tooltip
      label='Click to copy room URL'
      fontSize='md'
      bg={useColorModeValue("orange.200", "orange.900")}
      color={useColorModeValue("gray.600", "white")}
    >
    <IconButton
        icon={<PhoneIcon color='white' />}
        ml={6}
        onClick={handleAudioChatToggleButton}
        variant='solid'
        bg='linear-gradient(225deg, hsla(184, 100%, 54%, 1) 0%, hsla(210, 100%, 50%, 1) 100%)'
        aria-label='Copy room URL'
        _hover={{
          bg: "linear-gradient(225deg, hsla(210, 100%, 50%, 1) 0%, hsla(184, 100%, 54%, 1) 100%)",
        }}
        textAlign='end'
      />
    </Tooltip>
  )
}


export default AudioChatButton;