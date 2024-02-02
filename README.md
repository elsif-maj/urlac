# Readme

The server and client files being used here are modified versions of the Pion examples repository directory called sfu-ws: https://github.com/pion/example-webrtc-applications/tree/master/sfu-ws 

Todos:

- Refactor to not have everyone connected to everyone
  - Rooms were implemented in a naive way when I couldn't debug the preferable version of things
    where the current data structures for peerConnections and trackLocals both get prefixed with a map[string] 
    to relativize them to 'room' buckets 
