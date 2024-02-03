import { useState } from "react"
import audioChatConnect from "../services/audioChat"

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
    <button onClick={handleAudioChatToggleButton}>
      Audio Chat
    </button>
  )
}


export default AudioChatButton;