import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import meetClientService from "../../services/meetClientService";

export const useLeaveCallHandler = (meetId,userId, spaceId) => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocationRef = useRef(location);

  const leaveCall = () => {
    console.log("end Call")
    meetClientService.leftUser(meetId,spaceId,userId)
  };
  useEffect(() => {
    if (prevLocationRef.current !== location) {
      leaveCall();
      
    }
    prevLocationRef.current = location;
  }, [location]);

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     leaveCall();
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return ()=>{
    leaveCall()
    navigate(`/study-space/${spaceId}`)
  }
};
