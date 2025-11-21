import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuickDashboardAction = ({mode,handleJobNavigation}) => {
    const navigate = useNavigate()
  return (
      <div
      className={`p-4 rounded-2xl shadow-sm mt-4 
      ${mode === "dark" ? "text-white" : "text-black"}`}
    >
      <h2 className="font-bold text-xl mb-3">Recent Job Posts</h2>
        <div className='flex  gap-2 w-fit '>
            <button className='text-white bg-primary p-2 hover:bg-secondary duration-300 rounded-md cursor-pointer '
            onClick={()=>handleJobNavigation()}
            >
                Post a Job
            </button>
            <button className={`p-2 rounded-md cursor-pointer
                        ${mode === "dark" ? "bg-[var(--elementBg-dark)] hover:bg-[var(--elementBg-hover-dark)] duration-300  " : "bg-gray-300 shadow"}
                `} >
                View All Jobs
            </button>
        </div>
    </div>
  )
}

export default QuickDashboardAction
