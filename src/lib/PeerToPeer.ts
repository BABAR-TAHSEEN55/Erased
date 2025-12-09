// Holds the STUN Servers
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};
class WebRTCPeerConnection {
  private peerConnection?: RTCPeerConnection;
  private dataChannel?: RTCDataChannel | null = null;
  constructor() {
    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);
    // Hanlding Ice Candidate
    this.peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("New Ice Candidate", e.candidate);
      } else {
        //Do something
        // Get the ice_candiation info
        console.log(
          "New Ice Candidate Found!Reprinting SDP" +
            JSON.stringify(this.peerConnection?.localDescription),
        );
      }
    };
    // SDP is set

    this.peerConnection
      .createOffer()
      .then((o) => {
        this.peerConnection?.setLocalDescription(o);
        console.log(JSON.stringify(o));
      })
      .then(() => console.log("Set Successfully!"));
  }
}

const newConnection = new WebRTCPeerConnection();
console.log(newConnection);

// Error handling
// as ICE_Candidate is asynchonouse printing it before would result in half sdp so figure it out
