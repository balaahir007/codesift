import React from 'react'
import { Plus, Users } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../../utils/axiosInstance'

const StudySpaceWhiteBoard = () => {
    const {spaceId} = useParams()
    const navigate = useNavigate()
    const handleCreateWhiteboard = async(spaceId)=>{
        const idx = crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(0,10)
        navigate(`/study-space/${spaceId}/new-whiteboard/${idx}`)
        if(idx && spaceId){
            await axiosInstance.post(`/study-space/${spaceId}/create-whiteboard`,{
                whiteboardId: idx
            })
        }
    }
    return (
        <div className="w-full p-6 bg-white  rounded-xl shadow-lg">
            <div className="flex flex-wrap gap-6 justify-start">
                <div className="group relative overflow-hidden flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-primary bg-gradient-to-br from-blue-50 to-indigo-50 cursor-pointer hover:from-blue-100 hover:to-indigo-100 hover:border-blue-500 transition-all duration-500 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col items-center" onClick={()=>handleCreateWhiteboard(spaceId)}>
                        <div className="p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <Plus className="text-primary size-8 group-hover:rotate-90 transition-transform duration-300" />
                        </div>
                        <span className="mt-4 text-base font-semibold text-primary group-hover:text-primary transition-colors duration-300 text-center px-2">
                            Create New<br />Whiteboard
                        </span>
                    </div>
                </div>

                {/* <div className="group relative overflow-hidden flex flex-col items-center justify-center w-48 h-48 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 cursor-pointer hover:from-blue-50 hover:to-blue-100 hover:border-primary transition-all duration-500 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="p-4 bg-gradient-to-br from-primary to-indigo-600 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <Users className="text-white size-8 group-hover:animate-pulse" />
                        </div>
                        <span className="mt-4 text-base font-semibold text-primary group-hover:text-blue-900 transition-colors duration-300 text-center px-2">
                            Collaborative<br />Whiteboard
                        </span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default StudySpaceWhiteBoard