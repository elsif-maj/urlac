# Readme

For this project I have modified and extended server and client code from the Pion examples repository directory called sfu-ws: https://github.com/pion/example-webrtc-applications/tree/master/sfu-ws
Changes have been made to facilitate TLS, www hosting, add support for 'rooms', close connections (both RTCPeerConnection and WebSocket) in the client under different circumstances, and add additional error handling to the server.

Todos:

- Create React version of client that is functionally equivalent to interface with Umbra to prepare for integration

- Pare down to just audio 

- Refactor to not have everyone connected to everyone
  - Rooms were implemented in a naive way when I couldn't debug the preferable version of things
    where the current data structures for peerConnections and trackLocals both get prefixed with a map[string] 
    to relativize them to 'room' buckets 
