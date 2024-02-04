# Readme

Todos:

- Refactor to not have everyone connected to everyone
  - Rooms were implemented in a naive way when I couldn't debug the preferable version. What I think is desirable is for the data structures for peerConnections and trackLocals both get prefixed with a map[string] to relativize them to 'room' buckets. At present, everyone is 'peer connected' to everyone and only track broadcasting enforces 'rooms'.
    
For this project I have modified and extended server and client code from the Pion examples repository directory called sfu-ws: https://github.com/pion/example-webrtc-applications/tree/master/sfu-ws
Changes have been made to facilitate TLS, www hosting, add support for 'rooms', close connections (both RTCPeerConnection and WebSocket) in the client under different circumstances, and add additional error handling to the server.
