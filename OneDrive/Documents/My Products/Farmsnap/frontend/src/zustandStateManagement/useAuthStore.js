import { create } from "zustand";
import axios from "axios";
import summuryApi from "../common/summuryApi";
import { IoAlertCircle } from "react-icons/io5";
import customeToastify from "../helpers/FarmsnapAppHelpers/customToastify";
import {io} from 'socket.io-client'
const BASE_URL = import .meta.filename.MODE  === 'development' ? 'http://localhost:8000' : '/'

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIngUp: false,
  isUploadingProfile: false,
  isCheckingAuth: true,
  errorMsg: '',
  onlineUsers : [],
  socket : null,
  
  checkAuth: async () => {
    try {
      const response = await axios.get(summuryApi.checkAuth, {
        withCredentials: true,
      });
      set({ authUser: response?.data });
      get()?.connectSocket()
    } catch (error) {
      console.log("Error in CheckAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
    updateProfile: async (data) => {
      try {
        const response = await axios.put(summuryApi.updateProfilePic,data, {
          withCredentials: true,
        });
        set({ authUser: response.data });
      } catch (error) {
        console.log("Error in CheckAuth", error);
        set((state) => ({
          authUser: {
            ...state.authUser,
            profilePic:null
          },
        }));
      }
    },

  login: async (data) => {
    set({ isLoggingIngUp: true });
    set({errorMsg : ''})
    try {
      const response = await axios.post(summuryApi.login, data, {
        withCredentials: true,
      });
      set({ authUser: response.data });
      get().connectSocket()
      customeToastify('success', 'Welcome Back!');
    } catch (error) {
      customeToastify('error', 'Something Went Wrong');
      set({ errorMsg: error?.response?.data|| "Something went wrong. Please try again." });
    } finally {
      set({ isLoggingIngUp: false });
    }
  },

  register: async (data) => {
    set({ isSigningUp: true });
    set({errorMsg : ''})
    const { email, username, password, confirmPassword } = data;

    if (!email || !username || !password || !confirmPassword) {
      set({errorMsg :'Please provide all required information.' })
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      set({errorMsg : 'Invalid Email!'})
      return;
    }

    if (password.length < 6) {
      set({errorMsg : 'Invalid Email!'})
      setErrorMsg("Password should be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      set({error : 'Passwords do not match!'})
      return;
    }
    try {
      const response = await axios.post(summuryApi.register, data, {
        withCredentials: true,
      });
      set({ authUser: response.data });
      get().connectSocket()
      customeToastify('success', 'Account Created Successfully');
    } catch (error) {
      customeToastify('error', 'Account Creation Failed, try again');
      set({ errorMsg: error?.response?.data?.error || "Something went wrong. Please try again." });
    } finally {
      set({ isSigningUp: false });
    }
  },  
  
  logout: async () => {
      set({errorMsg : ''})
      try {
        const response = await axios.post(
          summuryApi.logout,
          {},
          {
            withCredentials: true,
          }
        );
        set({authUser : null})
        get().disconnectSocket()
      } catch (error) {
        set({ errorMsg: error?.response?.data?.error || "Something went wrong. Please try again." });
        console.log("Error in Logout", error);
      }
  },
  connectSocket : ()=>{
    const {authUser} = get()
    if(!authUser || get()?.socket?.connected) return;
    const socket = io(BASE_URL, {
      query : {
        userId : authUser?._id
      }
    })
    socket.connect()
    set({socket : socket})

    socket.on("getOnlineUsers",(userIds)=>{
      console.log("UserIds",userIds);
      
      set({onlineUsers : userIds})
    })
    socket.on("connect_error", (err) => {
      console.error("❌ WebSocket connection error:", err.message);
    });
  },
  disconnectSocket : ()=>{
      if(get().socket?.connected) get().socket?.disconnected();
  },

}));
