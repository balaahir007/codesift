import React, { useEffect, useState } from 'react'
import InfoCard from '../../card/teacher/InfoCard'
import { Users, BookOpen, Users2, TrendingUp, Award, Plus, Sparkles } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';
import { useNavigate, useOutletContext } from 'react-router-dom';
import StudySpaceCards from '../../components/admin/StudySpaceCards';
import useStudySpacesStore from '../../zustand/studySpaces/useStudySpaceStore';
import CollegeFormModal from '../../card/teacher/CollegeFormModal';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const TeacherStudySpace = () => {
  const { mode } = useThemeStore()
  const navigate = useNavigate()

  const { handleNavigation, openCollegeModel, setOpenCollegeModel, handleSubmitCollegeInfo } = useOutletContext()


  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const accentBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';

  const handleAddStudySpace = () => {
    navigate('/teacher/study-space/post');
  }

  // Mock data - replace with actual data
  // const studySpaces = [
  //   {
  //     id: 1,
  //     name: "Machine Learning Fundamentals",
  //     domain: "machine learning",
  //     goal: "Master ML algorithms and practical applications",
  //     techSkills: "Python, TensorFlow, Scikit-learn",
  //     tags: ["AI", "Python", "Data Science"],
  //     rules: "Complete weekly assignments, participate in discussions",
  //     visibility: "public",
  //     isAdmin: true,
  //     members: [1, 2, 3, 4, 5, 6, 7, 8],
  //     inviteCode: "ML2024",
  //     logo: null,
  //     createdAt: "2024-10-15"
  //   },
  //   // Add more mock data as needed
  // ];

  const [studySpaces, setStudySpaces] = useState([])
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    // Simulate loading
    const getSpaces = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get('/study-space/getAll/teacher')
        console.log("res.data.data", res.data.data)
        const spaces = res.data.data.map(item => item.studyspaces);
        if (spaces.length > 0) {
          setStudySpaces(spaces);
        }
      } catch (error) {
        toast.error("Failed to Get Study Spaces")
      } finally {

        setIsLoading(false);
      }
    }
    getSpaces()

  }, []);



  return (
    <div className={`bg-backGray min-h-screen transition-colors duration-300`}>
      {
        openCollegeModel && (
          <CollegeFormModal errors={errors} setErrors={setErrors} isOpen={openCollegeModel} onSubmit={handleSubmitCollegeInfo} onClose={() => setOpenCollegeModel((prev) => !prev)} />
        )
      }
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${textPrimary} mb-2 flex items-center gap-3`}>
                Study Spaces
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#0097B2]" />
              </h1>
              <p className={`${textSecondary} text-sm sm:text-base`}>
                Manage your learning communities and track student progress
              </p>
            </div>

            {/* Add Study Space Button */}
            <button
              onClick={handleAddStudySpace}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-5 sm:px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Add Study Space</span>
              <span className="sm:hidden">Create New</span>
            </button>
          </div>

          {/* Decorative line */}
          <div className={`h-1 w-24 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full`}></div>
        </div>

        {/* Stats Section */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${textPrimary}`}>
              Your Impact
            </h2>
            <div className={`${accentBg} ${textSecondary} px-3 py-1 rounded-full text-xs font-semibold`}>
              Overview
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <InfoCard
              icon={Users2}
              title="Active Learners"
              value="2,450"
              type="stat"
              cardBg={cardBg}
              borderColor={borderColor}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            />
            <InfoCard
              icon={BookOpen}
              title="Study Spaces"
              value="12"
              type="stat"
              cardBg={cardBg}
              borderColor={borderColor}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            />
            <InfoCard
              icon={TrendingUp}
              title="Learning Progress"
              value="89%"
              type="stat"
              cardBg={cardBg}
              borderColor={borderColor}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            />
            <InfoCard
              icon={Award}
              title="Achievements"
              value="24"
              type="stat"
              cardBg={cardBg}
              borderColor={borderColor}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
            />
          </div>
        </div>

        {/* Study Spaces Section */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-1`}>
                Your Study Spaces
              </h2>
              <p className={`${textSecondary} text-xs sm:text-sm`}>
                {studySpaces.length > 0
                  ? `Managing ${studySpaces.length} active ${studySpaces.length === 1 ? 'space' : 'spaces'}`
                  : 'No study spaces yet'}
              </p>
            </div>

            {/* Filter/Sort options (optional) */}
            <div className="hidden md:flex items-center gap-2">
              <button className={`${accentBg} ${textSecondary} hover:${textPrimary} px-3 py-2 rounded-lg text-sm font-medium transition-colors`}>
                All
              </button>
              <button className={`${accentBg} ${textSecondary} hover:${textPrimary} px-3 py-2 rounded-lg text-sm font-medium transition-colors`}>
                Active
              </button>
              <button className={`${accentBg} ${textSecondary} hover:${textPrimary} px-3 py-2 rounded-lg text-sm font-medium transition-colors`}>
                Archived
              </button>
            </div>
          </div>

          {/* Study Space Grid */}
          {studySpaces.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                studySpaces.map((space, index) => (
                  <div
                    key={space._id || index}
                    className=" mt-4 rounded-md "
                  >
                    <StudySpaceCards studySpace={space} mode={mode} />
                  </div>
                ))
              }

            </div>
          ) : (
            /* Empty State */
            <div className={`${cardBg} ${borderColor} border-2 rounded-3xl p-8 sm:p-12 text-center`}>
              <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-[#E0F2F5]'}`}>
                <BookOpen className={`w-10 h-10 sm:w-12 sm:h-12 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`} />
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-3`}>
                No Study Spaces Yet
              </h3>
              <p className={`${textSecondary} text-sm sm:text-base mb-6 max-w-md mx-auto`}>
                Create your first study space to start building learning communities and tracking student progress
              </p>
              <button
                onClick={handleAddStudySpace}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Create Study Space
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions Section (Optional) */}
        {studySpaces.length > 0 && (
          <div className="mt-10 sm:mt-12 lg:mt-16">
            <div className={`${cardBg} ${borderColor} border rounded-2xl p-6 sm:p-8`}>
              <h3 className={`text-lg sm:text-xl font-bold ${textPrimary} mb-4`}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <button className={`${accentBg} hover:${borderColor} hover:border ${textPrimary} p-4 rounded-xl text-left transition-all group`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0097B2] to-[#00B2A9] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Manage Members</div>
                      <div className={`${textSecondary} text-xs`}>View all participants</div>
                    </div>
                  </div>
                </button>
                <button className={`${accentBg} hover:${borderColor} hover:border ${textPrimary} p-4 rounded-xl text-left transition-all group`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0097B2] to-[#00B2A9] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">View Analytics</div>
                      <div className={`${textSecondary} text-xs`}>Track performance</div>
                    </div>
                  </div>
                </button>
                <button className={`${accentBg} hover:${borderColor} hover:border ${textPrimary} p-4 rounded-xl text-left transition-all group`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0097B2] to-[#00B2A9] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Achievements</div>
                      <div className={`${textSecondary} text-xs`}>Reward progress</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherStudySpace;