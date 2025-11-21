import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Crown, Users, Search } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import StudySpaceHomeSlideBar from '../../../components/learnhub/study-space/StudySpaceHomeSlideBar.jsx'
import { useNavigate } from "react-router-dom";
import useStudySpacesStore from "../../../zustand/studySpaces/useStudySpaceStore";
import ExploreSpaces from "./ExploreSpaces.jsx";
import { toast } from "react-toastify";
import useThemeStore from "../../../zustand/themeStore.js";

// Define theme variables (adjust based on your theme context)

const StudySpaceHome = () => {
  const [studySpaceState, setStudySpaceState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchStudySpace, studySpace } = useStudySpacesStore();
  const [section, setSection] = useState('my-spaces');
  const { mode } = useThemeStore()

  const navigate = useNavigate();
  const bgPrimary = 'bg-slate-50 dark:bg-[#0A1215]';
  const textSecondary = 'text-slate-600 dark:text-gray-400';
  const borderColor = 'border-slate-200 dark:border-[#294B4E]';
  const accentBg = 'bg-slate-100 dark:bg-[#0F1E20]';
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]/80' : 'bg-white/80';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-slate-900';

  useEffect(() => {
    const getSpaces = async () => {
      try {
        setIsLoading(true);
        await fetchStudySpace();
      } catch (error) {
        toast.error("Failed to Get Study Spaces");
      } finally {
        setIsLoading(false);
      }
    };
    getSpaces();
  }, []);

  return (
    <div className={`flex min-h-screen bg-backGray`}>
      {/* Sidebar */}
      <div className="w-64  flex-shrink-0 shadow-2xl hidden lg:block">
        <StudySpaceHomeSlideBar setSection={setSection} section={section} />
      </div>

      {/* Mobile Sidebar - Shows as drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <StudySpaceHomeSlideBar setSection={setSection} section={section} />
      </div>

      {section === 'my-spaces' ? (
        <div className={`flex-1 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10 relative overflow-hidden  pb-20 lg:pb-8`}>
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
            className={`relative flex flex-col lg:flex-row items-center justify-between ${mode === 'dark' ? 'bg-[#1B2E31]/70' : 'bg-white/70'
              } backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border ${mode === 'dark' ? 'border-[#294B4E]/20' : 'border-white/20'
              }`}
          >
            <div className="max-w-lg space-y-3 sm:space-y-4 z-10">
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${mode === 'dark'
                ? 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300'
                : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600'
                } bg-clip-text text-transparent`}>
                Welcome to <span className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent">StudySpace</span>
              </h1>
              <p className={`${textSecondary} text-base sm:text-lg leading-relaxed`}>
                A distraction-free place to learn with peers, share resources,
                and grow together in your academic journey.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${mode === 'dark'
                  ? 'bg-[#0F1E20] text-[#0097B2]'
                  : 'bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] text-[#0097B2]'
                  }`}>
                  🚀 Collaborative Learning
                </div>
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${mode === 'dark'
                  ? 'bg-[#0F1E20] text-[#00B2A9]'
                  : 'bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] text-[#00B2A9]'
                  }`}>
                  📚 Resource Sharing
                </div>
              </div>
            </div>
            <div className="relative mt-6 lg:mt-0 w-full lg:w-auto flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center"
                alt="Students studying together"
                className="w-full max-w-sm lg:w-80 h-48 sm:h-52 lg:h-60 object-cover rounded-xl sm:rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(0, 151, 178, 0.2), transparent)' }}></div>
            </div>
          </motion.div>

          {/* Study Spaces */}
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className={`text-xl sm:text-2xl font-bold ${mode === 'dark'
                ? 'bg-gradient-to-r from-gray-100 to-gray-300'
                : 'bg-gradient-to-r from-slate-800 to-slate-600'
                } bg-clip-text text-transparent`}>
                Your Study Spaces
              </h2>
              <div className={`${textSecondary} text-xs sm:text-sm font-medium`}>
                {studySpace?.length} spaces available
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`${bgCard} backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg animate-pulse overflow-hidden border ${borderColor}`}>
                    <div className={`h-24 sm:h-32 bg-gradient-to-br ${mode === 'dark' ? 'from-[#294B4E] to-[#1B2E31]' : 'from-slate-200 to-slate-300'}`}></div>
                    <div className="p-4 sm:p-6 space-y-3">
                      <div className={`h-4 sm:h-5 ${mode === 'dark' ? 'bg-[#294B4E]' : 'bg-slate-200'} rounded w-3/4`}></div>
                      <div className={`h-3 sm:h-4 ${mode === 'dark' ? 'bg-[#294B4E]' : 'bg-slate-200'} rounded w-1/2`}></div>
                      <div className="space-y-2 pt-2">
                        <div className={`h-3 ${mode === 'dark' ? 'bg-[#294B4E]' : 'bg-slate-200'} rounded`}></div>
                        <div className={`h-3 ${mode === 'dark' ? 'bg-[#294B4E]' : 'bg-slate-200'} rounded w-5/6`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) :
              studySpace.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`${bgCard} backdrop-blur-xl rounded-xl sm:rounded-2xl p-8 sm:p-16 text-center shadow-lg border ${borderColor}`}
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gradient-to-br from-slate-100 to-slate-200'} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <Search className={`w-8 h-8 sm:w-10 sm:h-10 ${mode === 'dark' ? 'text-gray-600' : 'text-slate-400'}`} />
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-2`}>No Spaces Found</h3>
                  <p className={`text-sm sm:text-base ${textSecondary}`}>Try adjusting your search or filters to discover more communities</p>
                </motion.div>
              ) :
                (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rouy"
                  >
                    {studySpace?.map((space, i) => (
                      <motion.div
                        key={space.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`group ${mode === 'dark' ? 'bg-[#1B2E31]/80' : 'bg-white/80'
                          } backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border ${mode === 'dark' ? 'border-[#294B4E]/20' : 'border-white/20'
                          }`}
                      >
                        {/* Header */}
                        <div
                          onClick={() => navigate(`${space.id}`)}
                          className="relative h-36 sm:h-40 flex items-center justify-center overflow-hidden cursor-pointer"
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
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-2xl object-cover z-10 group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-2xl bg-white/20 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-white text-xl sm:text-2xl font-bold">{space?.name?.charAt(0)}</span>
                            </div>
                          )}

                          {/* Hover overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            <FaExternalLinkAlt className="text-white text-lg sm:text-xl transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                          </div>

                          {/* Admin Badge */}
                          {space.isAdmin && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 + 0.3 }}
                              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-lg"
                              style={{ background: 'linear-gradient(to right, #FFB800, #FF8C00)' }}
                            >
                              <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              Admin
                            </motion.div>
                          )}

                          {/* Visibility Badge */}
                          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-1.5 text-white text-[10px] sm:text-xs bg-white/20 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/30">
                            {space.visibility === "private" ? (
                              <>
                                <EyeOff className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                Private
                              </>
                            ) : (
                              <>
                                <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                Public
                              </>
                            )}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                          <div>
                            <h3 className={`text-lg sm:text-xl font-bold ${mode === 'dark' ? 'text-gray-100' : 'text-slate-800'
                              } mb-2 group-hover:text-[#0097B2] transition-colors duration-300`}>
                              {space?.name}
                            </h3>
                            <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold capitalize ${mode === 'dark'
                              ? 'bg-[#0F1E20] text-[#0097B2]'
                              : 'bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] text-[#0097B2]'
                              }`}>
                              {space?.domain}
                            </span>
                          </div>

                          <div className={`${textSecondary} space-y-3 text-xs sm:text-sm`}>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" style={{ backgroundColor: '#0097B2' }}></div>
                              <div>
                                <span className={`font-semibold ${mode === 'dark' ? 'text-gray-300' : 'text-slate-700'
                                  }`}>Goal:</span>
                                <p className={`${textSecondary} mt-1`}>{space?.goal || "No goal specified"}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" style={{ backgroundColor: '#00B2A9' }}></div>
                              <div>
                                <span className={`font-semibold ${mode === 'dark' ? 'text-gray-300' : 'text-slate-700'
                                  }`}>Tech Skills:</span>
                                <p className={`${textSecondary} mt-1`}>{space?.techSkills || "No skills specified"}</p>
                              </div>
                            </div>
                          </div>

                          {space?.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {space?.tags?.slice(0, 4).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className={`${mode === 'dark' ? 'text-gray-300' : 'text-slate-700'
                                    } px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-200 cursor-default ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gradient-to-r from-[#F2F2F2] to-[#E0F2F5]'
                                    }`}
                                  onMouseEnter={(e) => {
                                    if (mode === 'light') {
                                      e.target.style.background = 'linear-gradient(to right, #E0F2F5, #B3E0E9)';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (mode === 'light') {
                                      e.target.style.background = 'linear-gradient(to right, #F2F2F2, #E0F2F5)';
                                    }
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                              {space?.tags?.length > 4 && (
                                <span className={`${textSecondary} px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${accentBg}`}>
                                  +{space?.tags?.length - 4}
                                </span>
                              )}
                            </div>
                          )}

                          <div className={`flex justify-between items-center pt-3 sm:pt-4 text-[10px] sm:text-xs ${textSecondary} border-t ${borderColor}`}>
                            <span className="flex items-center gap-1 sm:gap-1.5">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                              {space?.members?.length || 0} member{space?.members?.length !== 1 ? "s" : ""}
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00B2A9' }}></div>
                              Active
                            </span>
                          </div>

                          {space?.rules && (
                            <div className={`pt-2 sm:pt-3 border-t ${mode === 'dark' ? 'border-[#294B4E]/50' : 'border-[#E0F2F5]/50'
                              }`}>
                              <p className={`text-[10px] sm:text-xs ${textSecondary} italic leading-relaxed`}>
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
      )}
    </div>
  );
};

export default StudySpaceHome;