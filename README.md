# Readme

Todos:

- Create 'umbraIntegration' branch w/ React version of client that is functionally equivalent to interface with Umbra to prepare for integration

- Refactor to not have everyone connected to everyone
  - Rooms were implemented in a naive way when I couldn't debug the preferable version. What I think is desirable is for the data structures for peerConnections and trackLocals both get prefixed with a map[string] to relativize them to 'room' buckets. At present, everyone is 'peer connected' to everyone and only track broadcasting enforces 'rooms'.
    
For this project I have modified and extended server and client code from the Pion examples repository directory called sfu-ws: https://github.com/pion/example-webrtc-applications/tree/master/sfu-ws
Changes have been made to facilitate TLS, www hosting, add support for 'rooms', close connections (both RTCPeerConnection and WebSocket) in the client under different circumstances, and add additional error handling to the server. I have also created a version of the client that is a React component, and on the 'umbraIntegration' branch that React component has been specifically stylized to be used with Umbra ( umbra-collab.com ) as the UI component for audio chat functionality.
