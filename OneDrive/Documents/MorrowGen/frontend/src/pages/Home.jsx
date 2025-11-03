import React, { useEffect, useState } from "react";
import Banner from "../components/opportuneSpace/Banner";
import BookMenterShip from "../components/opportuneSpace/BookMenterShip";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import useAuthStore from "../zustand/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
const Home = () => {

  const { authUser } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (authUser) {
      navigate('/learnhub')
    }
  }, [authUser])

  return (
    <div className="w-full h-full">

      <div>
        <div className="pt-6 min-h-screen bg-white darkbg-gray-900 relative overflow-hidden">
          {/* Animated background elements matching banner */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#0097B2]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00B2A9]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0097B2]/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] darkbg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

          <div className="relative px-4 md:px-30">
            {/* Banner with proper container */}
            <div className="  mb-8 overflow-hidden">
              <Banner />
            </div>

            {/* BookMentership with themed background */}
            <div className="p-8 md:p-12 mb-8">
              <BookMenterShip />
            </div>

            {/* Footer with themed background */}
            <div className=" p-8 md:p-12 mb-8">
              <Footer />
            </div>
          </div>

          {/* Floating elements for visual interest */}
          <div className="absolute top-3/4 left-10 animate-bounce delay-1000 pointer-events-none">
            <div className="bg-[#00B2A9] w-2 h-2 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-2/3 right-20 animate-bounce delay-2000 pointer-events-none">
            <div className="bg-[#0097B2] w-3 h-3 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
