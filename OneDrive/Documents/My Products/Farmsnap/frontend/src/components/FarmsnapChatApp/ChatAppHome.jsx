import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatAppNavbar from './ChatAppNavbar'
import ChatApp from './ChatApp'
import { useAuthStore } from '../../zustandStateManagement/useAuthStore'

const ChatAppHome = () => {
  const navigate = useNavigate()
  const {authUser,checkAuth} = useAuthStore();
  useEffect(()=>{
    if(authUser === null){
      navigate('/login', { state: { from: 'chat' } });
    }
  },[authUser])
  
  
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  return (
    <div>
      <ChatAppNavbar/>
      <ChatApp/>
    </div>
  )
}

export default ChatAppHome
