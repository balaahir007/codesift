  import React from 'react'
  import { userChatStore } from '../../zustandStateManagement/userChatStore'
  import Sidebar from './Sidebar'
  import NoChatSelected from './NoChatSelected'
  import ChatContainer from './ChatContainer'
  import { useAuthStore } from '../../zustandStateManagement/useAuthStore'

  const ChatApp = () => {
      const {selectedUser} = userChatStore()
      const {onlineUsers} = useAuthStore()
      console.log("Online Users ",onlineUsers);
      
    return (
      <div className='h-screen bg-base-200'>
        <div className='flex items-center justify-center pt-20 px-4'>
          <div className='bg-base-500 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-8rem)]'>
              <div className='flex h-full rounded-lg overflow-hidden'>
                  <Sidebar/>
                  {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
              </div>

          </div>
        </div>
      </div>
    )
  }

  export default ChatApp
