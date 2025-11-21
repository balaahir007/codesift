import Peer from "peerjs";
import socketService from "./socketService";

class WebRTCService {
  constructor() {
    this.socket = null;
    this.peer = null;

    this.spaceId = null;
    this.userId = null;
    this.meetId = null;

    this.localStream = null;
    this.cameraStream = null;
    this.screenStream = null;

    this.isVideoEnabled = false;
    this.isAudioEnabled = false;
    this.isScreenSharing = false;

    // userId(string) -> MediaConnection
    this.activeCalls = new Map();
    // userId(string) -> RTCPeerConnection (from mediaConnection.peerConnection)
    this.peerConnections = new Map();

    // Hook-set callbacks
    this.onRemoteStreamAdded = null;
    this.onRemoteStreamRemoved = null;
    this.onConnectionStateChange = null;

    // Bind methods
    this.initialize = this.initialize.bind(this);
    this.cleanup = this.cleanup.bind(this);
    this.connectToParticipants = this.connectToParticipants.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.startScreenShare = this.startScreenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.getLocalStream = this.getLocalStream.bind(this);

    // Retry dial timers per remote userId
    this.dialRetryTimers = new Map();
  }

  _getPeerOptions() {
    const host =
      import.meta?.env?.VITE_PEER_HOST || "morrowgen-backend.onrender.com";
    // Use port 443 for HTTPS in production; fallback to 9000 for local dev
    const port =
      window.location.hostname === "localhost"
        ? Number(import.meta?.env?.VITE_PEER_PORT) || 9000
        : 443;
    const path = import.meta?.env?.VITE_PEER_PATH || "/peerjs";
    const secure =
      String(import.meta?.env?.VITE_PEER_SECURE || "") === "true" ||
      window.location.protocol === "https:";

    return { host, port, path, secure };
  }

  async initialize(spaceId, userId, meetId) {
    try {
      this.spaceId = String(spaceId);
      this.userId = String(userId);
      this.meetId = String(meetId);

      console.log("🚀 Initializing WebRTC service:", {
        spaceId: this.spaceId,
        userId: this.userId,
        meetId: this.meetId,
      });

      // 1) Ensure we have Socket.io connection
      let socket = socketService.getSocket(this.spaceId, this.userId);
      if (!socket || !socket.connected) {
        socketService.connectToSpace(this.spaceId, this.userId);
        socket = socketService.getSocket(this.spaceId, this.userId);
      }
      this.socket = socket;

      // 2) Start without media – user will opt-in by toggling mic/camera
      this.localStream = null;
      this.cameraStream = null;
      this.isVideoEnabled = false;
      this.isAudioEnabled = false;
      console.log(
        "ℹ️ Starting meet without mic/camera. User will enable on demand."
      );

      // 3) Initialize PeerJS
      const options = this._getPeerOptions();
      this.peer = new Peer(this.userId, options);

      await new Promise((resolve, reject) => {
        let done = false;
        const timeout = setTimeout(() => {
          if (!done) {
            done = true;
            reject(new Error("PeerJS connection timeout"));
          }
        }, 10000);

        this.peer.on("open", () => {
          if (!done) {
            done = true;
            clearTimeout(timeout);
            console.log("✅ PeerJS connection established");
            resolve();
          }
        });

        this.peer.on("error", (err) => {
          if (!done) {
            done = true;
            clearTimeout(timeout);
            console.error("❌ PeerJS connection failed:", err);
            reject(err);
          }
        });
      });

      // 4) Handle incoming calls
      this.peer.on("call", (call) => {
        try {
          console.log("📞 Incoming call from:", call.peer);
          // If we have no local stream yet, answer with an empty stream to allow receive-only
          const answerStream = this.localStream || this._getEmptyStream();
          call.answer(answerStream);
          this._registerCall(call);
        } catch (error) {
          console.error("❌ Failed to answer call:", error);
          try {
            call.close();
          } catch {}
        }
      });

      // 5) Ensure space join is acknowledged to avoid race, then join meet room
      await new Promise((resolve) => {
        let done = false;
        const timeout = setTimeout(() => {
          if (!done) resolve();
        }, 1500);
        this.socket.once("joined-space", ({ spaceId }) => {
          if (String(spaceId) === String(this.spaceId)) {
            done = true;
            clearTimeout(timeout);
            resolve();
          }
        });
      });

      // 6) Join meet room (include spaceId)
      this.socket.emit("join-meet-room", {
        meetId: this.meetId,
        spaceId: this.spaceId,
      });

      // 6) Wire socket events
      this._wireSocketEvents();

      console.log("✅ WebRTC service initialized successfully");
      return this.localStream;
    } catch (error) {
      console.error("❌ WebRTC initialization failed:", error);
      this.cleanup();
      throw error;
    }
  }

  _wireSocketEvents() {
    if (!this.socket) return;

    // Remove existing listeners to prevent duplicates
    this.socket.off("participant-joined");
    this.socket.off("participant-present");
    this.socket.off("participant-left");
    this.socket.off("webrtc-media-state");
    this.socket.off("webrtc-screen-share");
    this.socket.off("meet-error");

    // New participant joined (filter by current meet)
    this.socket.on("participant-joined", ({ userId, meetId }) => {
      if (String(meetId) !== String(this.meetId)) return;

      const otherId = String(userId);
      if (otherId === this.userId) return;
      if (this.activeCalls.has(otherId)) return;

      console.log("👋 New participant joined:", otherId);

      // Only one side should initiate to avoid double-call collision
      if (this._shouldInitiateCall(otherId)) {
        // Defer call to ensure their PeerJS is ready
        setTimeout(() => this._callUser(otherId), 500);
        // Schedule limited retry attempts if remote doesn't pickup immediately
        this._scheduleDialRetries(otherId);
      } else {
        console.log(
          "↩️ Skipping dial (non-initiator) to avoid collision with",
          otherId
        );
        // Rescue: if initiator never dials (due to race), dial after a short delay
        setTimeout(() => {
          if (!this.activeCalls.has(otherId)) {
            console.log("🛟 Non-initiator rescue dial to", otherId);
            this._forceCall(otherId);
          }
        }, 2500);
      }
    });

    // Existing participant present (sent only to the joining user)
    // Joiner will proactively dial to ensure at least one side initiates
    this.socket.on("participant-present", ({ userId, meetId }) => {
      if (String(meetId) !== String(this.meetId)) return;
      const otherId = String(userId);
      if (otherId === this.userId) return;
      if (this.activeCalls.has(otherId)) return;

      console.log("👥 Participant present:", otherId);
      // Force the joiner to place the initial call
      setTimeout(() => this._forceCall(otherId), 300);
      this._scheduleDialRetries(otherId);
    });

    // Participant left (filter by current meet)
    this.socket.on("participant-left", ({ userId, meetId }) => {
      if (String(meetId) !== String(this.meetId)) return;

      const otherId = String(userId);
      console.log("👋 Participant left:", otherId);
      this._closeCall(otherId);
      if (this.onRemoteStreamRemoved) {
        this.onRemoteStreamRemoved(otherId);
      }
    });

    // Media state updates (filter by current meet)
    this.socket.on(
      "webrtc-media-state",
      ({ userId, meetId, audioEnabled, videoEnabled }) => {
        if (String(meetId) !== String(this.meetId)) return;

        if (this.onConnectionStateChange) {
          const pc = this.peerConnections.get(String(userId));
          this.onConnectionStateChange(
            String(userId),
            pc?.connectionState || "connected"
          );
        }
      }
    );

    // Screen share updates (filter by current meet)
    this.socket.on("webrtc-screen-share", ({ userId, meetId, isSharing }) => {
      if (String(meetId) !== String(this.meetId)) return;

      console.log("🖥️ Screen share update:", { userId, isSharing });
    });

    // Surface meet errors for visibility
    this.socket.on("meet-error", (payload) => {
      try {
        console.error("❌ Meet error:", payload);
      } catch {}
    });
  }

  connectToParticipants(participants) {
    if (!participants || !Array.isArray(participants)) return;

    console.log("🔗 Connecting to participants:", participants.length);

    for (const p of participants) {
      const otherId = String(p.userId ?? p.id);
      if (!otherId || otherId === this.userId) continue;
      if (this.activeCalls.has(otherId)) continue;

      // Initiator-only dialing to prevent double call
      if (this._shouldInitiateCall(otherId)) {
        setTimeout(() => this._callUser(otherId), 200);
        this._scheduleDialRetries(otherId);
      } else {
        console.log("↩️ Skipping initial dial to", otherId, "(non-initiator)");
        // Rescue: if no call established shortly, force a dial to recover
        setTimeout(() => {
          if (!this.activeCalls.has(otherId)) {
            console.log(
              "🛟 Non-initiator rescue dial (connectToParticipants) to",
              otherId
            );
            this._forceCall(otherId);
          }
        }, 2500);
      }
    }
  }

  _callUser(otherUserId) {
    if (!this.peer) {
      console.warn("⚠️ Cannot call user - peer not ready");
      return;
    }

    // Guard against double-dial collisions: only initiator places the call
    if (
      typeof this._shouldInitiateCall === "function" &&
      !this._shouldInitiateCall(otherUserId)
    ) {
      console.log("↩️ Suppressing call; not initiator for", otherUserId);
      return;
    }

    try {
      console.log("📞 Calling user:", otherUserId);
      // If no local stream yet, place a receive-only call using an empty stream
      const outbound = this.localStream || this._getEmptyStream();
      const call = this.peer.call(String(otherUserId), outbound);
      this._registerCall(call);
    } catch (error) {
      console.error("❌ Failed to call user:", error);
    }
  }

  _forceCall(otherUserId) {
    if (!this.peer) {
      console.warn("⚠️ Cannot force call - peer not ready");
      return;
    }
    try {
      console.log("📞 Forcing call to:", otherUserId);
      // If no local stream yet, place a receive-only call using an empty stream
      const outbound = this.localStream || this._getEmptyStream();
      const call = this.peer.call(String(otherUserId), outbound);
      this._registerCall(call);
    } catch (error) {
      console.error("❌ Failed to force call:", error);
    }
  }

  _scheduleDialRetries(otherUserId) {
    const key = String(otherUserId);
    if (this.dialRetryTimers.has(key)) return;

    let attempts = 0;
    const tryDial = () => {
      if (this.activeCalls.has(key)) {
        this._clearDialRetry(key);
        return;
      }
      if (attempts >= 2) {
        this._clearDialRetry(key);
        return;
      }
      attempts += 1;
      console.log("📞 Retrying call to:", key, "attempt", attempts);
      this._callUser(key);
      const timer = setTimeout(tryDial, attempts === 1 ? 1500 : 3000);
      this.dialRetryTimers.set(key, timer);
    };

    const firstTimer = setTimeout(tryDial, 1500);
    this.dialRetryTimers.set(key, firstTimer);
  }

  _clearDialRetry(key) {
    const k = String(key);
    const t = this.dialRetryTimers.get(k);
    if (t) {
      try {
        clearTimeout(t);
      } catch {}
      this.dialRetryTimers.delete(k);
    }
  }

  _shouldInitiateCall(otherId) {
    const selfId = String(this.userId);
    const other = String(otherId);

    // Prefer numeric comparison if both are numeric
    const a = Number(selfId);
    const b = Number(other);
    if (!Number.isNaN(a) && !Number.isNaN(b)) {
      // Deterministic: higher numeric ID initiates
      return a > b;
    }
    // Fallback to lexicographic compare
    return selfId > other;
  }

  _registerCall(call) {
    if (!call) return;
    const otherId = String(call.peer);

    this.activeCalls.set(otherId, call);
    // We have an active call for this peer, clear any pending redial timers
    this._clearDialRetry(otherId);

    // Track RTCPeerConnection for state monitoring
    const pc = call.peerConnection;
    if (pc) {
      this.peerConnections.set(otherId, pc);

      const updateState = () => {
        if (this.onConnectionStateChange) {
          this.onConnectionStateChange(otherId, pc.connectionState || "new");
        }
      };

      try {
        pc.onconnectionstatechange = updateState;
        updateState(); // Initial state
      } catch (error) {
        console.error("❌ Failed to set connection state handler:", error);
      }
    }

    // Handle incoming stream
    call.on("stream", (remoteStream) => {
      console.log("📺 Received remote stream from:", otherId);
      if (this.onRemoteStreamAdded) {
        this.onRemoteStreamAdded(otherId, remoteStream);
      }
    });

    // Handle call close
    call.on("close", () => {
      console.log("📞 Call closed with:", otherId);
      this._closeCall(otherId);
      if (this.onRemoteStreamRemoved) {
        this.onRemoteStreamRemoved(otherId);
      }
    });

    // Handle call error
    call.on("error", (error) => {
      console.error("❌ Call error with:", otherId, error);
      this._closeCall(otherId);
      if (this.onRemoteStreamRemoved) {
        this.onRemoteStreamRemoved(otherId);
      }
    });
  }

  _getEmptyStream() {
    // Provide a cached "dummy" stream that does NOT access camera or microphone hardware.
    // We only include a silent WebAudio track (no device capture). No video track is added here to avoid any
    // browser camera indicators until the user explicitly enables camera via toggleVideo().
    if (this._emptyStream) {
      return this._emptyStream;
    }

    const createSilentAudioTrack = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ac = new AudioContext();
        const destination = ac.createMediaStreamDestination();
        // Keep a reference so the context isn't GC'ed
        this._dummyAudioContext = ac;
        const audioTrack = destination.stream.getAudioTracks()[0];
        if (audioTrack) {
          audioTrack.enabled = false; // effectively muted
          return audioTrack;
        }
      } catch (e) {
        console.warn("⚠️ Failed to create silent audio track:", e);
      }
      return null;
    };

    const audio = createSilentAudioTrack();
    const tracks = [];
    if (audio) tracks.push(audio);

    this._emptyStream = new MediaStream(tracks);
    return this._emptyStream;
  }

  // Re-invite all peers with current stream to ensure instant media updates
  _reinviteAll(stream) {
    const peers = Array.from(this.activeCalls.keys());
    console.log("🔄 Re-inviting all peers with current stream:", peers);

    for (const otherId of peers) {
      try {
        // Close existing call
        const existingCall = this.activeCalls.get(String(otherId));
        if (existingCall) {
          try {
            existingCall.close();
          } catch (e) {
            console.error("❌ Error closing existing call:", e);
          }
        }

        // Remove from active calls
        this.activeCalls.delete(String(otherId));
        this.peerConnections.delete(String(otherId));

        // Create new call with current stream
        setTimeout(() => {
          try {
            console.log("📞 Re-inviting peer with updated stream:", otherId);
            const newCall = this.peer.call(
              String(otherId),
              stream || this._getEmptyStream()
            );
            this._registerCall(newCall);
          } catch (err) {
            console.error("❌ Re-invite failed:", err);
          }
        }, 100);
      } catch (err) {
        console.error("❌ Error during re-invite:", err);
      }
    }
  }

  _replaceOutgoingVideoTrack(newTrack) {
    if (!newTrack) return;

    console.log("🔄 Replacing outgoing video track");

    // Ensure localStream contains the new video track for addTrack fallback
    if (!this.localStream) {
      this.localStream = new MediaStream([newTrack]);
    } else if (!this.localStream.getVideoTracks().includes(newTrack)) {
      try {
        // Stop any old/stale video tracks to keep a single active video track
        this.localStream.getVideoTracks().forEach((t) => {
          if (t !== newTrack) t.stop();
        });
      } catch {}
      try {
        this.localStream.addTrack(newTrack);
      } catch {}
    }

    for (const [, call] of this.activeCalls.entries()) {
      try {
        const pc = call.peerConnection;
        if (!pc) continue;

        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === "video");
        if (sender) {
          sender.replaceTrack(newTrack);
        } else {
          console.log("➕ No video sender found, adding track to connection");
          try {
            pc.addTrack(newTrack, this.localStream);
          } catch (err) {
            console.error("❌ Failed to add video track to connection:", err);
          }
        }
      } catch (error) {
        console.error("❌ Failed to replace video track:", error);
      }
    }
  }

  _replaceOutgoingAudioTrack(newTrack) {
    if (!newTrack) return;

    console.log("🔄 Replacing outgoing audio track");

    // Ensure localStream contains the new audio track for addTrack fallback
    if (!this.localStream) {
      this.localStream = new MediaStream([newTrack]);
    } else if (!this.localStream.getAudioTracks().includes(newTrack)) {
      try {
        // Stop any old/stale audio tracks to keep a single active audio track
        this.localStream.getAudioTracks().forEach((t) => {
          if (t !== newTrack) t.stop();
        });
      } catch {}
      try {
        this.localStream.addTrack(newTrack);
      } catch {}
    }

    for (const [, call] of this.activeCalls.entries()) {
      try {
        const pc = call.peerConnection;
        if (!pc) continue;

        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === "audio");
        if (sender) {
          sender.replaceTrack(newTrack);
        } else {
          console.log("➕ No audio sender found, adding track to connection");
          try {
            pc.addTrack(newTrack, this.localStream);
          } catch (err) {
            console.error("❌ Failed to add audio track to connection:", err);
          }
        }
      } catch (error) {
        console.error("❌ Failed to replace audio track:", error);
      }
    }
  }

  // New helper to ensure video senders exist or re-invite peers
  _ensureVideoSenders() {
    for (const [otherId, call] of this.activeCalls.entries()) {
      try {
        const pc = call.peerConnection;
        if (!pc) continue;
        const hasVideoSender = pc
          .getSenders()
          .some((s) => s.track && s.track.kind === "video");
        if (!hasVideoSender) {
          console.log(
            "↻ Re-inviting",
            otherId,
            "with updated local stream to add video sender"
          );
          try {
            call.close();
          } catch {}
          try {
            const newCall = this.peer.call(
              String(otherId),
              this.localStream || this._getEmptyStream()
            );
            this._registerCall(newCall);
          } catch (e) {
            console.error("❌ Re-invite failed:", e);
          }
        }
      } catch (err) {
        console.error("❌ ensureVideoSenders error:", err);
      }
    }
  }

  // Mute/disable outgoing video senders without holding camera hardware
  _disableOutgoingVideoSenders() {
    for (const [, call] of this.activeCalls.entries()) {
      try {
        const pc = call.peerConnection;
        if (!pc) continue;
        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === "video");
        if (sender) {
          try {
            sender.replaceTrack(null);
          } catch (e) {
            console.error("❌ Failed to replace video track with null:", e);
          }
        }
      } catch (err) {
        console.error("❌ disableOutgoingVideoSenders error:", err);
      }
    }
  }

  // Ensure mic on demand
  async _ensureMicTrack() {
    // If we already have an enabled audio track, nothing to do
    const existing = this.localStream?.getAudioTracks()?.[0];
    if (existing) {
      existing.enabled = true;
      this.isAudioEnabled = true;
      return existing;
    }

    // Request microphone only
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    const audioTrack = audioStream.getAudioTracks()[0];
    if (!audioTrack) throw new Error("No microphone track available");

    if (!this.localStream) this.localStream = new MediaStream();
    // Remove any previous audio tracks
    this.localStream.getAudioTracks().forEach((t) => t.stop());
    this.localStream.addTrack(audioTrack);

    // Propagate to existing connections
    this._replaceOutgoingAudioTrack(audioTrack);

    this.isAudioEnabled = true;
    return audioTrack;
  }

  // Ensure camera on demand
  async _ensureCameraTrack() {
    const existing = this.localStream?.getVideoTracks()?.[0];
    if (existing) {
      existing.enabled = true;
      this.isVideoEnabled = true;
      return existing;
    }

    const camStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 30 },
      },
    });

    // Preserve camera stream so we can restore after screen share
    this.cameraStream = camStream;

    const videoTrack = camStream.getVideoTracks()[0];
    if (!videoTrack) throw new Error("No camera track available");

    if (!this.localStream) this.localStream = new MediaStream();
    // Remove any previous video tracks
    this.localStream.getVideoTracks().forEach((t) => t.stop());
    try {
      this.localStream.addTrack(videoTrack);
    } catch {}

    // Propagate to existing connections (replace if sender exists, addTrack otherwise)
    this._replaceOutgoingVideoTrack(videoTrack);

    this.isVideoEnabled = true;
    return videoTrack;
  }

  async toggleVideo() {
    const next = !this.isVideoEnabled;
    console.log("📹 Toggling video:", next ? "ON" : "OFF");

    if (next) {
      // Turn ON video (lazy getUserMedia)
      try {
        await this._ensureCameraTrack();
        // Ensure existing peer connections have a video sender; if not, re-invite with updated stream
        this._ensureVideoSenders();

        // Force re-invite all peers to ensure instant video visibility
        setTimeout(() => {
          try {
            this._reinviteAll(this.localStream);
          } catch (e) {
            console.error(
              "❌ Failed to re-invite peers after video enable:",
              e
            );
          }
        }, 200);
      } catch (err) {
        console.error("❌ Failed to enable camera:", err);
        this.isVideoEnabled = false;
        return false;
      }
    } else {
      // Turn OFF video: stop and remove video tracks to release camera hardware, and mute senders
      try {
        const vids = this.localStream?.getVideoTracks?.() || [];
        vids.forEach((t) => {
          try {
            t.stop();
          } catch {}
          try {
            this.localStream.removeTrack(t);
          } catch {}
        });
        if (this.cameraStream) {
          try {
            this.cameraStream.getTracks().forEach((tr) => tr.stop());
          } catch {}
          this.cameraStream = null;
        }
      } catch {}

      // Mute outgoing senders (no camera hardware, no video frames)
      try {
        this._disableOutgoingVideoSenders?.();
      } catch {}

      this.isVideoEnabled = false;

      // Force re-invite all peers to ensure instant video removal visibility
      setTimeout(() => {
        try {
          this._reinviteAll(this.localStream);
        } catch (e) {
          console.error("❌ Failed to re-invite peers after video disable:", e);
        }
      }, 200);
    }

    // Broadcast state to others immediately
    try {
      this.socket?.emit("webrtc-media-state", {
        videoEnabled: this.isVideoEnabled,
        audioEnabled: this.isAudioEnabled,
      });
      console.log(
        "📡 Broadcasted video state:",
        this.isVideoEnabled ? "ON" : "OFF"
      );
    } catch (error) {
      console.error("❌ Failed to broadcast video state:", error);
    }

    return this.isVideoEnabled;
  }

  async toggleAudio() {
    const next = !this.isAudioEnabled;
    console.log("🎤 Toggling audio:", next ? "ON" : "OFF");

    if (next) {
      // Turn ON mic (lazy getUserMedia)
      try {
        await this._ensureMicTrack();

        // Force re-invite all peers to ensure instant audio visibility
        setTimeout(() => {
          try {
            this._reinviteAll(this.localStream);
          } catch (e) {
            console.error(
              "❌ Failed to re-invite peers after audio enable:",
              e
            );
          }
        }, 200);
      } catch (err) {
        console.error("❌ Failed to enable microphone:", err);
        this.isAudioEnabled = false;
        return false;
      }
    } else {
      // Turn OFF mic (disable existing track)
      this.localStream?.getAudioTracks()?.forEach((t) => (t.enabled = false));
      this.isAudioEnabled = false;

      // Force re-invite all peers to ensure instant audio removal visibility
      setTimeout(() => {
        try {
          this._reinviteAll(this.localStream);
        } catch (e) {
          console.error("❌ Failed to re-invite peers after audio disable:", e);
        }
      }, 200);
    }

    // Broadcast state to others immediately
    try {
      this.socket?.emit("webrtc-media-state", {
        videoEnabled: this.isVideoEnabled,
        audioEnabled: this.isAudioEnabled,
      });
      console.log(
        "📡 Broadcasted audio state:",
        this.isAudioEnabled ? "ON" : "OFF"
      );
    } catch (error) {
      console.error("❌ Failed to broadcast audio state:", error);
    }

    return this.isAudioEnabled;
  }

  async startScreenShare() {
    if (this.isScreenSharing) {
      console.log("ℹ️ Screen sharing already active");
      return this.screenStream;
    }

    try {
      console.log("🖥️ Starting screen share...");

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "motion",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: true, // Include system audio
      });

      this.screenStream = displayStream;
      this.isScreenSharing = true;

      // Get screen video track
      const screenVideoTrack = displayStream.getVideoTracks()[0];
      const screenAudioTrack = displayStream.getAudioTracks()[0];

      if (!screenVideoTrack) {
        throw new Error("No video track in screen share");
      }

      // Get current audio track from camera stream
      const cameraAudioTrack = this.cameraStream?.getAudioTracks()[0];

      // Create new local stream with screen video and audio
      const tracks = [screenVideoTrack];
      if (screenAudioTrack) {
        tracks.push(screenAudioTrack);
      } else if (cameraAudioTrack) {
        tracks.push(cameraAudioTrack);
      }

      const newLocalStream = new MediaStream(tracks);
      this.localStream = newLocalStream;

      // Replace tracks on all active connections
      this._replaceOutgoingVideoTrack(screenVideoTrack);
      if (screenAudioTrack) {
        this._replaceOutgoingAudioTrack(screenAudioTrack);
      } else if (cameraAudioTrack) {
        this._replaceOutgoingAudioTrack(cameraAudioTrack);
      }

      // Ensure peers have a video sender; if not, gracefully re-invite with updated stream
      try {
        this._ensureVideoSenders();
      } catch (e) {
        console.error("❌ Failed to ensure video senders for screen share:", e);
      }

      // Unconditionally re-invite all peers with the new screen stream to guarantee delivery across all browsers
      try {
        this._reinviteAll(this.localStream);
      } catch (e) {
        console.error("❌ Failed to re-invite peers for screen share:", e);
      }

      // Handle screen share end
      screenVideoTrack.onended = () => {
        console.log("🖥️ Screen share ended by user");
        this.stopScreenShare();
      };

      // Broadcast screen share state
      try {
        this.socket?.emit("webrtc-screen-share", { isSharing: true });
        console.log("📡 Broadcasted screen share state: ON");
      } catch (error) {
        console.error("❌ Failed to broadcast screen share state:", error);
      }

      console.log("✅ Screen sharing started successfully");
      return displayStream;
    } catch (error) {
      console.error("❌ Failed to start screen share:", error);
      this.isScreenSharing = false;
      this.screenStream = null;
      throw error;
    }
  }

  async stopScreenShare() {
    if (!this.isScreenSharing) {
      console.log("ℹ️ Screen sharing not active");
      return;
    }

    try {
      console.log("🖥️ Stopping screen share...");

      // Stop screen tracks
      if (this.screenStream) {
        this.screenStream.getTracks().forEach((track) => track.stop());
      }

      this.screenStream = null;
      this.isScreenSharing = false;

      // Restore camera stream
      if (this.cameraStream) {
        const cameraVideoTrack = this.cameraStream.getVideoTracks()[0];
        const cameraAudioTrack = this.cameraStream.getAudioTracks()[0];

        if (cameraVideoTrack) {
          // Replace video track with camera
          this._replaceOutgoingVideoTrack(cameraVideoTrack);

          // Rebuild local stream for UI preview
          const tracks = [cameraVideoTrack];
          if (cameraAudioTrack) {
            tracks.push(cameraAudioTrack);
          }

          this.localStream = new MediaStream(tracks);

          // Ensure outgoing audio track is restored to camera mic if available
          if (cameraAudioTrack) {
            this._replaceOutgoingAudioTrack(cameraAudioTrack);
          }

          // Re-invite peers so the returned camera feed shows instantly without refresh
          try {
            this._reinviteAll(this.localStream);
          } catch (e) {
            console.error(
              "❌ Failed to re-invite peers after screen share stop:",
              e
            );
          }
        } else {
          // No camera video available; mute outgoing video senders
          try {
            this._disableOutgoingVideoSenders?.();
          } catch {}
          // Also re-invite with current (audio-only or empty) stream to flush stale video state
          try {
            this._reinviteAll(this.localStream);
          } catch (e) {
            console.error(e);
          }
        }
      } else {
        // No camera stream at all; mute outgoing video senders
        try {
          this._disableOutgoingVideoSenders?.();
        } catch {}
        // Re-invite to propagate "no video" to peers
        try {
          this._reinviteAll(this.localStream);
        } catch (e) {
          console.error(e);
        }
      }

      // Broadcast screen share state
      try {
        this.socket?.emit("webrtc-screen-share", { isSharing: false });
        console.log("📡 Broadcasted screen share state: OFF");
      } catch (error) {
        console.error("❌ Failed to broadcast screen share state:", error);
      }

      console.log("✅ Screen sharing stopped successfully");
    } catch (error) {
      console.error("❌ Failed to stop screen share:", error);
    }
  }

  getLocalStream() {
    return this.localStream;
  }

  _closeCall(otherUserId) {
    const key = String(otherUserId);
    const call = this.activeCalls.get(key);

    if (call) {
      try {
        call.close();
      } catch (error) {
        console.error("❌ Error closing call:", error);
      }
      this.activeCalls.delete(key);
    }

    this.peerConnections.delete(key);
  }

  cleanup() {
    console.log("🧹 Cleaning up WebRTC service");

    // Leave meet room
    try {
      if (this.socket && this.meetId) {
        this.socket.emit("leave-meet-room", { meetId: this.meetId });
      }
    } catch (error) {
      console.error("❌ Error leaving meet room:", error);
    }

    // Close all calls
    for (const [uid] of this.activeCalls.entries()) {
      this._closeCall(uid);
    }
    this.activeCalls.clear();

    // Destroy peer
    if (this.peer && !this.peer.destroyed) {
      try {
        this.peer.destroy();
      } catch (error) {
        console.error("❌ Error destroying peer:", error);
      }
    }
    this.peer = null;

    // Clear any pending dial retry timers
    try {
      for (const [, timer] of this.dialRetryTimers.entries()) {
        clearTimeout(timer);
      }
      this.dialRetryTimers.clear();
    } catch (e) {
      // no-op
    }

    // Stop all tracks
    try {
      this.localStream?.getTracks().forEach((track) => track.stop());
      this.cameraStream?.getTracks().forEach((track) => track.stop());
      this.screenStream?.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("❌ Error stopping tracks:", error);
    }

    this.localStream = null;
    this.cameraStream = null;
    this.screenStream = null;

    // Clear socket reference
    this.socket = null;

    // Clear maps
    this.peerConnections.clear();
    try {
      this.remoteCompositeStreams?.clear();
    } catch {}
    this.spaceId = null;
    this.userId = null;
    this.meetId = null;

    // Reset state
    this.isVideoEnabled = false;
    this.isAudioEnabled = false;
    this.isScreenSharing = false;

    console.log("✅ WebRTC service cleaned up");
  }
}

const webRTCService = new WebRTCService();
export default webRTCService;
