import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserNotLogin = () => {
    const navigate = useNavigate()
  return (
    <div className="mt-10 flex flex-col items-center space-y-2">
          <span className="text-sm  text-[#1F88BE]">
            Please Login to explore
          </span>
          <button className="bg-[#1F88BE] text-white w-20 cursor-pointer hover:bg-[#186A96] rounded" onClick={()=>navigate('/login')}>
            Login
          </button>
    </div>
  )
}

export default UserNotLogin
