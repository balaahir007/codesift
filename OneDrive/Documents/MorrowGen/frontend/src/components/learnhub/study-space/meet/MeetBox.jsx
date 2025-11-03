import React, { useEffect, useState } from "react";
import { Users, Video, X, Maximize2, Minimize2 } from "lucide-react";
import useMeetStore from "../../../../zustand/studySpaces/useMeetStore";
import {useNavigate, useParams} from 'react-router-dom'
import meetClientService from "../../../../services/meetClientService";
import useAuthStore from "../../../../zustand/auth/useAuthStore";

const MeetBox = () => {
  const {spaceId} = useParams()
  const [isExpanded, setIsExpanded] = useState(false);
  // Convert meets object to array
  const [meetData,setMeetData] = useState([])
  const { meets } = useMeetStore();
  const navigate = useNavigate()
  const {authUser} = useAuthStore()
  
  useEffect(()=>{
    if(meets){
      setMeetData(Object.values(meets))
    }
  },[meets])
  const handleJoinMeet = async(meetId) => {
    meetClientService.joinUser(meetId,spaceId,authUser?.id)
    navigate(`meet/${meetId}`)
  };

  const handleCloseMeet = (meetId, e) => {
    e.stopPropagation();
    console.log("Close meet:", meetId);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        right: "20px",
        zIndex: 9999, // Higher z-index to ensure it's always on top
      }}
    >
      {/* Small Icon Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 relative"
        >
          <Video className="w-5 h-5" />
          {meetData.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {meetData.length}
            </span>
          )}
        </button>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-72">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="font-medium text-sm">Active Meetings</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {meetData.length}
              </span>
            </div>
            <button
              className="p-1 hover:bg-white/20 rounded transition-colors"
              onClick={() => setIsExpanded(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-80 overflow-y-auto">
            <div className="p-3 space-y-2">
              {meetData.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No active meetings
                </div>
              ) : (
                meetData.map((meet) => (
                  <div
                    key={meet.id}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 text-sm mb-1 truncate">
                          {meet.name}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                          <Users className="w-3 h-3" />
                          <span>
                            {meet.participants.length} participant{meet.participants.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        {meet.participants.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {meet.participants.slice(0, 3).map((participant) => (
                              <span
                                key={participant.id}
                                className="inline-block px-2 py-1 bg-[#0097B2]/10 text-[#0097B2] text-xs rounded-full"
                              >
                                {participant.name}
                              </span>
                            ))}
                            {meet.participants.length > 3 && (
                              <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                                +{meet.participants.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        className="px-3 py-1.5 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white text-xs rounded-md hover:shadow-md transition-shadow font-medium whitespace-nowrap"
                        onClick={() => handleJoinMeet(meet.id)}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50 rounded-b-lg">
              <button className="w-full text-center text-xs text-[#0097B2] hover:text-[#00B2A9] font-medium transition-colors">
                View All Meetings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetBox;