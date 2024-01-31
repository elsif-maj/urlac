# Readme

This is an experimentation in getting clients connected for audio chat via WebRTC using a Go SF.

The server and client files being used here are *barely* modified versions of the Pion examples repository directory called sfu-ws ( link ).

Current status is I have this deployed on a DO droplet and got TLS/WSS working -- I can get connection between peers for audio and/or video (if wanted) but the websocket connections close uncerimoniously after 60 seconds or so and everyone is disconnected.  I'm adding some logging, added some headers to my Nginx config, and we will see what that turns up.

Next step might be trying to add a 'heartbeat' message from the client over WS to see if there is something going on with auto-disconnects somewhere in the network path for idle WS connections.
