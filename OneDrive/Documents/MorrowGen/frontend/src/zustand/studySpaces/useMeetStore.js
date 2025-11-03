import { create } from "zustand";
import meetClientService from "../../services/meetClientService";
import axiosInstance from "../../utils/axiosInstance";

const useMeetStore = create((set, get) => ({
  meets: {},

  meetState: {
    isLoading: false,
    errorMeg: null,
  },

  fetchMeetState: {
    isLoading: false,
    errorMeg: null,
  },

  joinState: {
    isLoading: false,
    errorMeg: null,
  },

  // Add the missing createMeetState
  createMeetState: {
    isLoading: false,
    errorMeg: null,
  },

  initMeetHandlers: (spaceId, userId) => {
    meetClientService.registerMeetHandlers(
      spaceId,
      userId,
      // onNewMeet
      (meetData) => {
        console.log("meet created : success", meetData);
        set((state) => ({
          meets: { ...state.meets, [meetData.meetId]: meetData },
        }));
      },
      // onMeetJoined - Updated to handle the new data structure
      (participantData) => {
        const meetId = participantData.meetId;
        console.log("✅ someone joined the meet", participantData);

        set((state) => {
          const existingMeet = state.meets[meetId];
          if (!existingMeet) return state;

          // Transform the participant data to match your UI expectations
          const transformedParticipant = {
            id: participantData.id,
            userId: participantData.userId,
            username: participantData.username,
            name: participantData.username, // Use username as display name
            meetId: participantData.meetId,
            joinedAt: participantData.joinedAt,
            role: "Participant", // Default role
            // Add avatar if you have a way to generate it
            avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${participantData.username}`,
          };

          // Prevent duplicate participants based on userId
          const alreadyExists = existingMeet.participants?.some(
            (p) => p.userId === participantData.userId
          );

          if (alreadyExists) {
            // Update existing participant if needed
            return {
              meets: {
                ...state.meets,
                [meetId]: {
                  ...existingMeet,
                  participants: existingMeet.participants.map(p => 
                    p.userId === participantData.userId ? transformedParticipant : p
                  ),
                },
              },
            };
          }

          return {
            meets: {
              ...state.meets,
              [meetId]: {
                ...existingMeet,
                participants: [...(existingMeet.participants || []), transformedParticipant],
              },
            },
          };
        });
      },

      // onMeetLeft
      (participantData) => {
        const meetId = participantData.meetId;
        console.log("meet left for other : ", meetId);
        set((state) => {
          const existingMeet = state.meets[meetId];
          if (!existingMeet) return state;
          return {
            meets: {
              ...state.meets,
              [meetId]: {
                ...existingMeet,
                participants: existingMeet.participants.filter(
                  (p) => p.userId !== participantData.userId
                ),
              },
            },
          };
        });
      },
      // onMeetEnded
      (meetId) => {
        set((state) => {
          const updated = { ...state.meets };
          delete updated[meetId];
          return { meets: updated };
        });
      },
      // meet error
      (error) => {
        set((state) => ({
          meetState: {
            ...state.meetState,
            isLoading: false,
            errorMeg: error.message,
          },
        }));
      },
      // join error
      (error) => {
        set((state) => ({
          joinState: {
            ...state.joinState,
            isLoading: false,
            errorMeg: error,
          },
        }));
      }
    );
  },

  // Update clearError to accept error type
  clearError: (errorType = "meetState") => {
    set((state) => ({
      [errorType]: {
        ...state[errorType],
        errorMeg: null,
      },
    }));
  },

  fetchAllMeet: async (spaceId) => {
    set((state) => ({
      fetchMeetState: {
        ...state.fetchMeetState,
        isLoading: true,
        errorMeg: null,
      },
    }));
    try {
      const res = await axiosInstance.get(
        `/study-space/meet/getMeets/${spaceId}`
      );
      console.log("res.data.data", res.data.data);
      const data = res.data.data;
      if (data) {
        const dataObj = {};
        data.forEach((meet) => {
          // Transform participants data when fetching meets
          const transformedMeet = {
            ...meet,
            participants: meet.participants?.map(participant => ({
              id: participant.id,
              userId: participant.userId,
              username: participant.username,
              name: participant.username,
              meetId: participant.meetId,
              joinedAt: participant.joinedAt,
              role: "Participant",
              avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${participant.username}`,
            })) || []
          };
          dataObj[meet.id] = transformedMeet;
        });
        set((state) => ({
          meets: dataObj,
          fetchMeetState: { ...state.fetchMeetState, isLoading: false },
        }));
      }
    } catch (error) {
      set((state) => ({
        fetchMeetState: {
          ...state.fetchMeetState,
          isLoading: false,
          errorMeg: error.message,
        },
      }));
    }
  },

  // Add createMeet method
  createMeet: async (spaceId, userId, name) => {
    set((state) => ({
      createMeetState: {
        ...state.createMeetState,
        isLoading: true,
        errorMeg: null,
      },
    }));

    try {
      const meetData = await meetClientService.createNewMeet(
        spaceId,
        userId,
        name
      );

      set((state) => ({
        meets: {
          ...state.meets,
          [meetData.meetId || meetData.id]: meetData,
        },
        createMeetState: {
          ...state.createMeetState,
          isLoading: false,
        },
      }));

      return meetData;
    } catch (error) {
      set((state) => ({
        createMeetState: {
          ...state.createMeetState,
          isLoading: false,
          errorMeg: error.message || "Failed to create meet",
        },
      }));
      throw error;
    }
  },

  // Add joinMeet method - Updated to handle response properly
  joinMeet: async (meetId, spaceId, userId) => {
    set((state) => ({
      joinState: {
        ...state.joinState,
        isLoading: true,
        errorMeg: null,
      },
    }));

    try {
      const participantData = await meetClientService.joinUser(meetId, spaceId, userId);

      // If joinUser returns participant data, update the store
      if (participantData && participantData.meetId) {
        set((state) => {
          const existingMeet = state.meets[meetId];
          if (existingMeet) {
            const transformedParticipant = {
              id: participantData.id,
              userId: participantData.userId,
              username: participantData.username,
              name: participantData.username,
              meetId: participantData.meetId,
              joinedAt: participantData.joinedAt,
              role: "Participant",
              avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${participantData.username}`,
            };

            const alreadyExists = existingMeet.participants?.some(
              (p) => p.userId === participantData.userId
            );

            if (!alreadyExists) {
              return {
                meets: {
                  ...state.meets,
                  [meetId]: {
                    ...existingMeet,
                    participants: [...(existingMeet.participants || []), transformedParticipant],
                  },
                },
                joinState: {
                  ...state.joinState,
                  isLoading: false,
                },
              };
            }
          }
          
          return {
            joinState: {
              ...state.joinState,
              isLoading: false,
            },
          };
        });
      } else {
        set((state) => ({
          joinState: {
            ...state.joinState,
            isLoading: false,
          },
        }));
      }

      return participantData;
    } catch (error) {
      set((state) => ({
        joinState: {
          ...state.joinState,
          isLoading: false,
          errorMeg: error.message || "Failed to join meet",
        },
      }));
      throw error;
    }
  },

  // Helper method to manually update meet participants (useful for real-time updates)
  updateMeetParticipants: (meetId, participants) => {
    set((state) => {
      const existingMeet = state.meets[meetId];
      if (!existingMeet) return state;

      const transformedParticipants = participants.map(participant => ({
        id: participant.id,
        userId: participant.userId,
        username: participant.username || `User ${participant.userId}`,
        name: participant.username || `User ${participant.userId}`,
        meetId: participant.meetId,
        joinedAt: participant.joinedAt,
        role: participant.userId === existingMeet.creatorId ? "Host" : "Participant",
        avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=user${participant.userId}`,
      }));

      return {
        meets: {
          ...state.meets,
          [meetId]: {
            ...existingMeet,
            participants: transformedParticipants,
          },
        },
      };
    });
  },
}));

export default useMeetStore;