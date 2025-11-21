import React from "react";
import { FaRocket, FaUsers, FaTrophy, FaChartLine, FaArrowRight, FaStar, FaBriefcase } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/auth/useAuthStore";
import AnimatedHeading from "../../ui/learnhubUi/AnimatedHeading";
import useThemeStore from "../../zustand/themeStore";

const Banner = () => {
  const {authUser} = useAuthStore();
  const navigate = useNavigate()
  const {mode} =useThemeStore();

  // Theme colors
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-white';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
  const badgeBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-100';
  const badgeText = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const gridGradient = mode === 'dark' 
    ? 'bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]'
    : 'bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)]';
  const ctaBg = mode === 'dark' ? 'bg-gradient-to-r from-[#0F1E20] to-[#1B2E31]' : 'bg-gradient-to-r from-gray-50 to-gray-100';
  const secondaryBtnBorder = mode === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const secondaryBtnText = mode === 'dark' ? 'text-gray-300 hover:text-[#00B2A9]' : 'text-gray-700 hover:text-[#00B2A9]';

  const startFn = () => {
    if(authUser?.id){
      navigate('/learnhub/courses')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className={`relative w-full min-h-screen px-4 md:px-30 overflow-hidden transition-colors duration-300`}>
      {/* Animated background elements with theme colors */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-20 w-72 h-72 ${mode === 'dark' ? 'bg-[#0097B2]/20' : 'bg-[#0097B2]/10'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-20 w-96 h-96 ${mode === 'dark' ? 'bg-[#00B2A9]/20' : 'bg-[#00B2A9]/10'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${mode === 'dark' ? 'bg-[#0097B2]/15' : 'bg-[#0097B2]/5'} rounded-full blur-3xl animate-pulse delay-2000`}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 ${gridGradient} bg-[size:50px_50px]`}></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 ${badgeBg} border ${borderColor} rounded-full px-4 py-2 mb-6 transition-colors duration-300`}>
            <FaStar className="text-[#00B2A9] text-sm" />
            <span className={`${badgeText} text-sm font-medium`}>Your Career Success Platform</span>
          </div>
          
          <AnimatedHeading/>
          
          <p className={`text-xl md:text-2xl ${textSecondary} max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-300`}>
            Accelerate your professional growth with personalized guidance, skill development, and strategic career planning. 
            Your dream job awaits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => startFn()} className="group relative bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#0097B2]/25">
              <span className="flex items-center gap-3">
                Start Your Journey
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className={`group border-2 ${secondaryBtnBorder} ${secondaryBtnText} font-semibold py-4 px-8 rounded-full ${hoverBg} transition-all duration-300`}>
              Explore Platform
            </button>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: FiTarget, title: "Goal Setting", description: "Define your career objectives" },
            { icon: FaRocket, title: "Skill Building", description: "Enhance your capabilities" },
            { icon: FaBriefcase, title: "Job Matching", description: "Find perfect opportunities" },
            { icon: FaChartLine, title: "Track Progress", description: "Monitor your growth" }
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`${sectionBg} ${hoverBg} rounded-2xl p-6 transition-all duration-300 border ${borderColor} hover:border-[#00B2A9]/30 hover:shadow-lg`}>
                <feature.icon className="text-3xl text-[#00B2A9] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className={`text-lg font-bold ${textPrimary} mb-1 transition-colors duration-300`}>{feature.title}</div>
                <div className={`${textSecondary} text-sm transition-colors duration-300`}>{feature.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Smart Career Planning",
              description: "Get personalized roadmaps tailored to your industry and goals, with actionable steps to advance your career.",
              gradient: "from-[#0097B2] to-[#007A94]"
            },
            {
              title: "Professional Development",
              description: "Access curated learning resources and skill assessments to stay competitive in today's job market.",
              gradient: "from-[#00B2A9] to-[#009490]"
            },
            {
              title: "Network & Connect",
              description: "Build meaningful professional relationships and discover opportunities through strategic networking.",
              gradient: "from-[#0097B2] via-[#00B2A9] to-[#009490]"
            }
          ].map((service, index) => (
            <div key={index} className="group">
              <div className={`${sectionBg} ${mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-white'} rounded-2xl p-8 transition-all duration-300 border ${borderColor} hover:border-[#00B2A9]/30 hover:shadow-lg h-full`}>
                <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <FaRocket className="text-white text-xl" />
                </div>
                <h3 className={`text-xl font-bold ${textPrimary} mb-4 transition-colors duration-300`}>{service.title}</h3>
                <p className={`${textSecondary} leading-relaxed transition-colors duration-300`}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section - Compact */}
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-8 transition-colors duration-300`}>
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Personalized Guidance",
              "Industry Skills",
              "Network Access",
              "Growth Tracking"
            ].map((benefit, index) => (
              <div key={index} className={`${sectionBg} ${hoverBg} rounded-xl p-4 border ${borderColor} hover:border-[#00B2A9]/30 hover:shadow-md transition-all duration-300`}>
                <div className="w-6 h-6 bg-[#00B2A9] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <p className={`${textPrimary} font-medium text-sm transition-colors duration-300`}>{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Compact */}
        <div className="text-center max-w-4xl mx-auto">
          <div className={`${ctaBg} rounded-3xl p-8 border ${borderColor} shadow-lg transition-colors duration-300`}>
            <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-3 transition-colors duration-300`}>
              Ready to Unlock Your Potential?
            </h2>
            <p className={`${textSecondary} text-base mb-6 max-w-2xl mx-auto transition-colors duration-300`}>
              Take the first step towards your dream career with our comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] text-white font-bold py-3 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105">
                Get Started Today
              </button>
              <button className={`border-2 border-[#00B2A9]/50 hover:border-[#00B2A9] text-[#00B2A9] hover:text-[#007A94] font-semibold py-3 px-8 rounded-full hover:bg-[#00B2A9]/5 transition-all duration-300`}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements with theme colors */}
      <div className="absolute top-1/4 left-10 animate-bounce delay-1000">
        <div className={`w-3 h-3 rounded-full ${mode === 'dark' ? 'bg-[#00B2A9]/70' : 'bg-[#00B2A9]'}`}></div>
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce delay-2000">
        <div className={`w-2 h-2 rounded-full ${mode === 'dark' ? 'bg-[#0097B2]/70' : 'bg-[#0097B2]'}`}></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-bounce">
        <div className={`w-4 h-4 rounded-full ${mode === 'dark' ? 'bg-gradient-to-r from-[#0097B2]/60 to-[#00B2A9]/60' : 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]'}`}></div>
      </div>
    </div>
  );
};

export default Banner;