/*
To implement a room-based system, you need to make some changes to your current code.
Here's a step-by-step plan:

1. Modify the `peerConnectionState` struct to include a `roomID` field.
2. Modify the `websocketHandler` function to accept a room ID from the incoming WebSocket connection.
		This could be done by passing the room ID as part of the URL (e.g., `/websocket/roomID`).
3. Update the `addTrack` and `removeTrack` functions to only add or remove tracks for peer connections
		in the same room.
4. Update the `signalPeerConnections` and `dispatchKeyFrame` functions to only signal or dispatch to
		peer connections in the same room.

Here's how you could implement these changes:
*/

type peerConnectionState struct {
	peerConnection *webrtc.PeerConnection
	websocket      *threadSafeWriter
	roomID         string
}

// Modify the map of peerConnections to be a map of roomID to slice of peerConnectionState
var peerConnections = make(map[string][]peerConnectionState)

// Modify the websocketHandler to accept a roomID from the URL
func websocketHandler(w http.ResponseWriter, r *http.Request) {
	// Extract the roomID from the URL. This assumes the URL is in the format /websocket/roomID
	roomID := strings.TrimPrefix(r.URL.Path, "/websocket/")

	// Rest of the function...

	// Add our new PeerConnection to global list
	listLock.Lock()
	peerConnections[roomID] = append(peerConnections[roomID], peerConnectionState{peerConnection, c, roomID})
	listLock.Unlock()

	// Rest of the function...
}

// Modify addTrack, removeTrack, signalPeerConnections, and dispatchKeyFrame to only operate on peer connections in the same room
func addTrack(t *webrtc.TrackRemote, roomID string) *webrtc.TrackLocalStaticRTP {
	// Rest of the function...

	for _, pcs := range peerConnections[roomID] {
		// Rest of the function...
	}
}

// Similar modifications for removeTrack, signalPeerConnections, and dispatchKeyFrame

/*
This is a simplified example and may need to be adjusted based on your specific requirements. For
example, you may want to add error handling for when a room ID is not provided or does not exist.
You may also need to handle removing rooms when they are empty.
*/