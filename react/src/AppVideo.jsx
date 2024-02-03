// import { useState } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  const handleAudioChatToggleButton = (e) => {
    e.preventDefault()

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        let pc = new RTCPeerConnection()
        let disconnectButton = document.getElementById('button')


        pc.ontrack = function (event) {
          if (event.track.kind === 'audio') {
            return
          }

          let el = document.createElement(event.track.kind)
          el.srcObject = event.streams[0]
          el.autoplay = true
          el.controls = true
          document.getElementById('remoteVideos').appendChild(el)

          event.track.onmute = function (event) {
            el.play()
          }

          event.streams[0].onremovetrack = ({ track }) => {
            if (el.parentNode) {
              el.parentNode.removeChild(el)
            }
          }
        }

        document.getElementById('localVideo').srcObject = stream
        stream.getTracks().forEach(track => pc.addTrack(track, stream))

        // let ws = new WebSocket("{{.}}")
        let ws = new WebSocket("wss://erlacmaj.com/websocket/")

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
            pc = null;
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

              // The rest of this is original version, including the 'return' :
              // pc.setRemoteDescription(offer)
              // pc.createAnswer().then(answer => {
              //   pc.setLocalDescription(answer)
              //   ws.send(JSON.stringify({event: 'answer', data: JSON.stringify(answer)}))
              // })

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
          <h3> Local Video </h3>
          <video id="localVideo" width="160" height="120" autoPlay muted></video> <br />

          <h3> Remote Video </h3>
          <div id="remoteVideos"></div> <br />

          <h3> Logs </h3>
          <div id="logs"></div>

          <button id="button">close connection</button>
        </div>
      </div>
    </>
  )
}

export default App
