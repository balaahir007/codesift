import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import RecruiterNavbar from "../../components/recruiter/RecruiterNavbar";
import RecruiterSlideBar from "../../components/recruiter/RecruiterSlideBar";

const RecruiterHome = () => {
  const [extendMenu, setExtendMenu] = useState(window.innerWidth > 768);
  const [openCompanyModel, setCompanyModel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth > 768;
      setExtendMenu(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleJobNavigation = async () => {
    try {
      const res = await axiosInstance.get("/company");
      if (res.data) {
        navigate("/recruiter/jobs/post");
      }
    } catch (error) {
      setCompanyModel(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-backGray overflow-hidden">
      <RecruiterNavbar extendMenu={extendMenu} setExtendMenu={setExtendMenu} />

      <div className="flex flex-1 overflow-hidden">
        <RecruiterSlideBar extendMenu={extendMenu} setExtendMenu={setExtendMenu} />
        <main className="flex-1 p-4 overflow-y-auto scrollbar-hidden">
          <Outlet context={{ handleJobNavigation, openCompanyModel, setCompanyModel }} />
        </main>
      </div>
    </div>
  );
};

export default RecruiterHome;
