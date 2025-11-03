export const SOCKET_EVENTS = {
  EMIT: {
    MEET_CREATE: 'meet-create',
    MEET_JOIN: 'meet-join',
    MEET_LEFT: 'meet-left',
    MEET_ENDED: 'meet-ended',
    
    JOIN_MEET_ROOM: 'join-meet-room',
    LEAVE_MEET_ROOM: 'leave-meet-room',
    WEBRTC_OFFER: 'webrtc-offer',
    WEBRTC_ANSWER: 'webrtc-answer',
    WEBRTC_ICE_CANDIDATE: 'webrtc-ice-candidate',
    WEBRTC_MEDIA_STATE: 'webrtc-media-state',
    WEBRTC_SCREEN_SHARE: 'webrtc-screen-share',

    CREATE_POOL : 'create-pool',
    ADD_VOTE : 'add-vote',

  },
  
  ON: {
    MEET_CREATED: 'meet-created',
    NEW_MEET: 'new-meet',
    MEET_JOINED: 'meet-joined',
    MEET_LEFT: 'meet-left',
    MEET_ENDED: 'meet-ended',
    MEET_ERROR: 'meet-error',
    JOIN_ERROR: 'join-error',
    
    PARTICIPANT_JOINED: 'participant-joined',
    PARTICIPANT_LEFT: 'participant-left',
    WEBRTC_OFFER: 'webrtc-offer',
    WEBRTC_ANSWER: 'webrtc-answer',
    WEBRTC_ICE_CANDIDATE: 'webrtc-ice-candidate',
    WEBRTC_MEDIA_STATE: 'webrtc-media-state',
    WEBRTC_SCREEN_SHARE: 'webrtc-screen-share',

    // pool on events
    NEW_POOL : 'new-pool',
    
  }
};

export default SOCKET_EVENTS;
