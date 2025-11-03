import React, { useState } from "react";
import {
  FaBookOpen,
  FaVideo,
  FaUserGraduate,
  FaMagic,
  FaArrowRight,
  FaStar,
  FaFire,
  FaCheck,
} from "react-icons/fa";
import { MdVoiceChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import bannerImage from '../../assets/learnhub/images/learnhub-banner.png'
export default function LearnHubHome() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const quickAccessCards = [
    {
      title: "Courses",
      description: "Learn from curated courses",
      icon: <FaBookOpen size={28} />,
      link: "/learnhub/courses",
      color: "from-[#0097B2] to-[#00B2A9]",
    },
    {
      title: "Sessions",
      description: "Join live learning sessions",
      icon: <FaVideo size={28} />,
      link: "/learnhub/sessions",
      color: "from-[#00B2A9] to-[#008B99]",
    },
    {
      title: "Mentorship",
      description: "Get guided by experts",
      icon: <FaUserGraduate size={28} />,
      link: "/learnhub/mentorship",
      color: "from-[#0097B2] to-[#0077A3]",
    },
    {
      title: "Mock Interview",
      description: "Practice real interviews",
      icon: <MdVoiceChat size={28} />,
      link: "/learnhub/mock-interview",
      color: "from-[#00B2A9] to-[#005A78]",
    },
  ];


  const features = [
    {
      icon: <FaMagic size={20} />,
      title: "AI-Powered Learning",
      description: "Get personalized course recommendations based on your goals",
    },
    {
      icon: <FaFire size={20} />,
      title: "Track Your Progress",
      description: "Monitor your achievements with detailed analytics",
    },
    {
      icon: <FaStar size={20} />,
      title: "Expert Support",
      description: "Learn from industry professionals and experienced mentors",
    },
  ];

  const benefits = [
    "Comprehensive course library",
    "Live interactive sessions",
    "One-on-one mentorship",
    "Interview preparation",
    "Certification programs",
    "24/7 Learning access",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0097B2]/5 to-[#00B2A9]/5"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Learn Together, Grow Together
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join a vibrant community of learners. Access in-demand courses, live sessions with experts, and grow with mentorship from industry professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/learnhub/courses")}
                  className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Explore Courses <FaArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate("/learnhub/sessions")}
                  className="border-2 border-[#0097B2] text-[#0097B2] font-semibold py-3 px-8 rounded-lg hover:bg-[#0097B2]/5 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Join Live Sessions
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-[#0097B2]">50K+</div>
                  <p className="text-gray-600 text-sm">Active Learners</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0097B2]">500+</div>
                  <p className="text-gray-600 text-sm">Courses</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0097B2]">95%</div>
                  <p className="text-gray-600 text-sm">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`${bannerImage ||  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop'}`}
                  alt="Students learning together"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 bg-white rounded-lg p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0097B2] to-[#00B2A9] flex items-center justify-center">
                      <FaVideo className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Live Sessions</p>
                      <p className="text-gray-600 text-xs">Learn with experts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get Started
          </h2>
          <p className="text-gray-600 text-lg">
            Access all learning resources from one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessCards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(card.link)}
              className="group cursor-pointer"
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0097B2]/5 to-[#00B2A9]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-xl p-6 border border-gray-200 hover:border-[#0097B2] transition-all duration-300 h-full flex flex-col">
                  <div className={`bg-gradient-to-br ${card.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {card.description}
                  </p>
                  <div className="flex items-center text-[#0097B2] font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                    Explore <FaArrowRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Choose LearnHub?
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need for successful learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-[#0097B2] hover:shadow-md transition-all duration-300"
              >
                <div className="text-[#0097B2] mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Complete Learning Solution
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We provide everything you need to accelerate your career and achieve your learning goals.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0097B2] flex items-center justify-center flex-shrink-0">
                    <FaCheck size={12} className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-[#0097B2]/10 to-[#00B2A9]/10 rounded-2xl p-12 border border-[#0097B2]/20">
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0097B2]/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#0097B2]"></div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-2 bg-gray-300 rounded-full w-full"></div>
                      <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-gray-100 mb-8 leading-relaxed">
            Join thousands of learners who are advancing their skills and achieving their goals with LearnHub.
          </p>
          <button
            onClick={() => navigate("/learnhub/courses")}
            className="bg-white text-[#0097B2] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            Start Learning Now <FaArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Learners", value: "50K+" },
              { label: "Courses Available", value: "500+" },
              { label: "Expert Mentors", value: "200+" },
              { label: "Success Rate", value: "95%" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-[#0097B2] mb-1">
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}