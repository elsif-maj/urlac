import { useState } from 'react'

function App() {
  const [urlacIsOn, setUrlacIsOn] = useState(false)
  const [pc, setPc] = useState(new RTCPeerConnection())
  const [ws, setWs] = useState(new WebSocket("wss://erlacmaj.com/websocket/"))

  const handleAudioChatToggleButton = (e) => {
    e.preventDefault()

    // if (urlacIsOn) {
    //   console.log('ON!')
    //   pc.close()
    //   ws.close()
    //   setUrlacIsOn(!urlacIsOn)
    //   return
    // }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
       
        if (urlacIsOn) {
          console.log('ON!')
          pc.close()
          ws.close()
          setUrlacIsOn(!urlacIsOn)
          return
        }
        setPc(new RTCPeerConnection())
        // let pc = new RTCPeerConnection()
        let disconnectButton = document.getElementById('button')


        pc.ontrack = function (event) {
          const audio = new Audio();
          // const stream = new MediaStream();
          stream.addTrack(event.track);
          audio.srcObject = stream;
          audio.play();
        }

// This works!  But is adding a new track every time the button is clicked

        setWs(new WebSocket("wss://erlacmaj.com/websocket/"))
        // let ws = new WebSocket("{{.}}")
        // let ws = new WebSocket("wss://erlacmaj.com/websocket/")

        // Send a heartbeat every 5 seconds
        setInterval(() => {
          if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({ event: 'heartbeat', data: 'ping' }));
          }
        }, 5000);

        // MUH ATTEMPTS
        disconnectButton.addEventListener('click', function (e) {
          pc.close()
          ws.close()
        })

        window.addEventListener('beforeunload', function (event) {
          if (document.visibilityState === 'hidden' && pc) {
            console.log('THIS FIRED')
            pc.close();
            ws.close();
            // pc = null;
          }
        });
        // END OF MUH ATTEMPTS

        pc.onicecandidate = e => {
          if (!e.candidate) {
            return
          }

          ws.send(JSON.stringify({ event: 'candidate', data: JSON.stringify(e.candidate) }))
        }

        ws.onclose = function (evt) {
          window.alert("Websocket has closed with code: " + evt.code + " reason: " + evt.reason)
        }

        ws.onmessage = function (evt) {
          let msg = JSON.parse(evt.data)
          if (!msg) {
            return console.log('failed to parse msg')
          }

          switch (msg.event) {
            case 'offer':
              let offer = JSON.parse(msg.data)
              if (!offer) {
                return console.log('failed to parse answer')
              }

              // New version:
              pc.setRemoteDescription(offer)
                .then(() => pc.createAnswer())
                .then(answer => {
                  pc.setLocalDescription(answer)
                  ws.send(JSON.stringify({ event: 'answer', data: JSON.stringify(answer) }))
                })
                .catch(error => {
                  console.error('Error during setRemoteDescription/createAnswer: ', error)
                })

              return

            case 'candidate':
              let candidate = JSON.parse(msg.data)
              if (!candidate) {
                return console.log('failed to parse candidate')
              }

              pc.addIceCandidate(candidate)
          }
        }

        ws.onerror = function (evt) {
          console.log("ERROR (evt.data): " + evt.data)
          console.log("ERROR (evt): " + evt)
        }
      }).catch(window.alert)
    
      setUrlacIsOn(!urlacIsOn)
  }

  return (
    <>
      <h1>Urlac</h1>
      <div className="card">
        <p>
          Welcome to the Umbra-integration React front end for Urlac audio chat...
        </p>
        <button onClick={handleAudioChatToggleButton}>
          Audio Chat
        </button>
        <div>
          <button id="button">close connection</button>
        </div>
      </div>
    </>
  )
}

export default App
