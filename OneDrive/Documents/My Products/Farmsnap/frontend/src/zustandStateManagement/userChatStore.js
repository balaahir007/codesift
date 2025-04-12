import { create } from "zustand";
import { axiosInstence } from "../assets/assets";
import customToastify from "../helpers/FarmsnapAppHelpers/customToastify";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const userChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  subscribeUser : false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstence.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      const message = error.response?.data?.error || "Something went wrong!";
      console.error("Error fetching users:", error);
      customToastify("error", message);
    } finally {
      set({ isUsersLoading: false });
    }
  },  

  getMessages: async (userId) => {    
    const {messages : mess} = get()
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstence.get(`/messages/${userId}`);
      set({ messages: res.data });
      console.log(res.data)
    } catch (error) {
      const message = error.response?.data?.error || "Something went wrong!";
      console.error("Error fetching messages:", error);
      customToastify("error", message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  subscribeToMessages : async()=>{
      const {selectedUser} = get()
      if(!selectedUser) return;

      const socket = useAuthStore.getState().socket;

      socket.on('newMessage',(newMessage)=>{
        set({
          messages : [...get().messages,newMessage]
        })
      })
  },
  unSubscribeFromMessages : ()=>{
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage')
  },

  sendMessages : async(messageData)=>{
    try {      
      const {selectedUser,messages} = get()
      const res = await axiosInstence.post(`/messages/send/${selectedUser._id}`,messageData)
      set({ messages: [...messages, res.data] });
    } catch (error) {
      customToastify("error", error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
