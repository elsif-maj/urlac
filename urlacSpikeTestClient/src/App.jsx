import { useState } from 'react'
// import './App.css'

function App() {
  const [voicechatState, setVoicechatState] = useState("off")

  const handleVCStateButtonPress = () => {
    if (voicechatState === "off") {
      setVoicechatState("on")
    } else {
      setVoicechatState("off")
    }
  }

  return (
    <>
      <h1>This is a test client</h1>
      <div>
        <button onClick={handleVCStateButtonPress}>
          Voicechat is {voicechatState}
        </button>
        <p>
          Click the above button to turn on the voicechat functionality.
        </p>
      </div>
    </>
  )
}

export default App
