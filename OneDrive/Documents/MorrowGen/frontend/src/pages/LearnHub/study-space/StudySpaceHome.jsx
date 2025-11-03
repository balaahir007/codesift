import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Crown, Users } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import StudySpaceHomeSlideBar from '../../../components/learnhub/study-space/StudySpaceHomeSlideBar.jsx'
import { useNavigate } from "react-router-dom";
import useStudySpacesStore from "../../../zustand/studySpaces/useStudySpaceStore";
import ExploreSpaces from "./ExploreSpaces.jsx";
import { toast } from "react-toastify";
// Mock data for demonstration


// Sidebar Component



const StudySpaceHome = () => {
  const [studySpaceState, setStudySpaceState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchStudySpace,studySpace } = useStudySpacesStore()

  const [section,setSection] = useState('my-spaces')

  const navigate = useNavigate()
  useEffect(() => {
    // Simulate loading
    const getSpaces = async () => {
      try {
        setIsLoading(true);
        await fetchStudySpace()
      } catch (error) {
          toast.error("Failed to Get Study Spaces")
      } finally {

        setIsLoading(false);
      }
    }
    getSpaces()

  }, []);

  // useEffect(()=>{
  //   if(!studySpace || studySpace.length == 0){
  //     setSection('explore-spaces')
  //   }
  // },[studySpace])

  return (
    <div className="flex min-h-screen" >
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 shadow-2xl">
        <StudySpaceHomeSlideBar setSection={setSection} section={section} />
      </div>
        {
           section === 'my-spaces' ? (

      <div className="flex-1 p-8 space-y-10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" style={{ background: 'linear-gradient(to right, #0097B2, #00B2A9)' }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" style={{ background: 'linear-gradient(to right, #00B2A9, #0097B2)' }}></div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col lg:flex-row items-center justify-between bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20"
        >
          <div className="max-w-lg space-y-4 z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
              Welcome to <span className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent">StudySpace</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              A distraction-free place to learn with peers, share resources,
              and grow together in your academic journey.
            </p>
            <div className="flex gap-3 pt-2">
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'linear-gradient(to right, #E0F2F5, #B3E0E9)', color: '#0097B2' }}>
                🚀 Collaborative Learning
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'linear-gradient(to right, #E0F2F5, #B3E0E9)', color: '#00B2A9' }}>
                📚 Resource Sharing
              </div>
            </div>
          </div>
          <div className="relative mt-6 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center"
              alt="Students studying together"
              className="w-80 h-60 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(0, 151, 178, 0.2), transparent)' }}></div>
          </div>
        </motion.div>

        {/* Study Spaces */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Your Study Spaces
            </h2>
            <div className="text-slate-500 text-sm font-medium">
              {studySpace?.length} spaces available
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg animate-pulse">
                  <div className="h-36 rounded-t-2xl" style={{ background: 'linear-gradient(to bottom right, #D9D9D9, #F2F2F2)' }}></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 rounded w-3/4" style={{ backgroundColor: '#D9D9D9' }}></div>
                    <div className="h-3 rounded w-1/2" style={{ backgroundColor: '#D9D9D9' }}></div>
                    <div className="space-y-2">
                      <div className="h-3 rounded" style={{ backgroundColor: '#D9D9D9' }}></div>
                      <div className="h-3 rounded w-4/5" style={{ backgroundColor: '#D9D9D9' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {studySpace?.map((space, i) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20"
                >
                  {/* Header */}
                  <a
                    onClick={() => navigate(`${space.id}`)}
                    className="relative h-40 flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(to bottom right, #0097B2, #00B2A9, #0097B2)' }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-xl transform translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>

                    {space.logo ? (
                      <img
                        src={space?.logo}
                        alt={`${space?.name} logo`}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-2xl object-cover z-10 group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-4 border-white shadow-2xl bg-white/20 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-2xl font-bold">{space?.name?.charAt(0)}</span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <FaExternalLinkAlt className="text-white text-xl transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>

                    {/* Admin Badge */}
                    {space.isAdmin && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="absolute top-3 right-3 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                        style={{ background: 'linear-gradient(to right, #FFB800, #FF8C00)' }}
                      >
                        <Crown className="w-3 h-3" />
                        Admin
                      </motion.div>
                    )}

                    {/* Visibility Badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white text-xs bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                      {space.visibility === "private" ? (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Private
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" />
                          Public
                        </>
                      )}
                    </div>
                  </a>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#0097B2] transition-colors duration-300">
                        {space?.name}
                      </h3>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: 'linear-gradient(to right, #E0F2F5, #B3E0E9)', color: '#0097B2' }}>
                        {space?.domain}
                      </span>
                    </div>

                    <div className="text-slate-600 space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0097B2' }}></div>
                        <div>
                          <span className="font-semibold text-slate-700">Goal:</span>
                          <p className="text-slate-600 mt-1">{space?.goal || "No goal specified"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#00B2A9' }}></div>
                        <div>
                          <span className="font-semibold text-slate-700">Tech Skills:</span>
                          <p className="text-slate-600 mt-1">{space?.techSkills || "No skills specified"}</p>
                        </div>
                      </div>
                    </div>

                    {space?.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {space?.tags?.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-slate-700 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-default"
                            style={{ background: 'linear-gradient(to right, #F2F2F2, #E0F2F5)' }}
                            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #E0F2F5, #B3E0E9)'}
                            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #F2F2F2, #E0F2F5)'}
                          >
                            {tag}
                          </span>
                        ))}
                        {space?.tags?.length > 4 && (
                          <span className="text-slate-500 px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: '#F2F2F2' }}>
                            +{space?.tags?.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 text-xs text-gray-500" style={{ borderTop: '1px solid #E0F2F5' }}>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {space?.members?.length || 0} member{space?.members?.length !== 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00B2A9' }}></div>
                        Active
                      </span>
                    </div>

                    {space?.rules && (
                      <div className="pt-3" style={{ borderTop: '1px solid rgba(224, 242, 245, 0.5)' }}>
                        <p className="text-xs text-gray-500 italic leading-relaxed">
                          "{space?.rules}"
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
           ) : (
            <ExploreSpaces />
           )
        }
    </div>
  );
};

export default StudySpaceHome;