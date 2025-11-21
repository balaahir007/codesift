import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import RecruiterSlideBar from "../../components/recruiter/RecruiterSlideBar";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import TeacherSlideBar from "../../components/teacher/TeacherSlideBar";

const TeacherHome = () => {
  const [extendMenu, setExtendMenu] = useState(window.innerWidth > 768);
  const [openCollegeModel, setOpenCollegeModel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth > 768;
      setExtendMenu(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [actionType, setActionType] = useState()
  const handleNavigation = async () => {
    try {
      const res = await axiosInstance.get("/college");
      console.log("res.data.colleges", res.data.colleges)
      const isCollegeInfoAvailable = res.data.colleges.length > 0
      if (isCollegeInfoAvailable) {
        if (actionType === 'space') {

          navigate("/teacher/study-space/post");
        } else if (actionType === 'hacks') {
          navigate("/teacher/hackathon/post");

        }
      } else {

        setOpenCollegeModel(true);
      }
    } catch (error) {
    }
  };

  const handleSubmitCollegeInfo = async (data) => {
    try {
      const res = await axiosInstance.post('/college', data)
      if (res.data) {
        setOpenCollegeModel(false)
        if (actionType === 'space') {

          navigate("/teacher/study-space/post");
        } else if (actionType === 'hacks') {
          navigate("/teacher/hackathon/post");

        }
      }
    } catch (error) {
    }
  }

  return (
    <div className="h-screen flex flex-col bg-backGray overflow-hidden">
      <TeacherNavbar extendMenu={extendMenu} setExtendMenu={setExtendMenu} />

      <div className="flex flex-1 overflow-hidden">
        <TeacherSlideBar extendMenu={extendMenu} setExtendMenu={setExtendMenu} />
        <main className="flex-1 p-4 overflow-y-auto scrollbar-hidden">
          <Outlet context={{ setActionType, handleNavigation, openCollegeModel, setOpenCollegeModel,handleSubmitCollegeInfo }} />
        </main>
      </div>
    </div>
  );
};


export default TeacherHome
