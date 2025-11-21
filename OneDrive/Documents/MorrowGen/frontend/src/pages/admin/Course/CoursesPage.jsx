import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, BookOpen, Users, Clock, MoreVertical, TrendingUp, Award } from 'lucide-react';
import CoursesCard from '../../../components/learnhub/CoursesCard';
import axiosInstance from '../../../utils/axiosInstance';
import CourseCardSkeleton from '../../../card/learnhubCards/CourseCardSkeleton';
import CreateCourseModal from '../../../components/admin/CreateCourseModal';
import { toast } from 'react-toastify';
import useThemeStore from '../../../zustand/themeStore';

const AdminCoursesPage = () => {
    const navigate = useNavigate();
    const {mode} = useThemeStore()
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

    // Theme variables
    const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-backGray';
    const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-100';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const hoverShadow = mode === 'dark' ? 'hover:shadow-lg hover:shadow-gray-900/50' : 'hover:shadow-md';
    const inputBg = mode === 'dark' ? 'bg-gray-800' : 'bg-white';
    const inputBorder = mode === 'dark' ? 'border-gray-600' : 'border-tertiary';
    const inputFocusBorder = mode === 'dark' ? 'focus:border-primary' : 'focus:border-primary200';
    const iconBgPrimary = mode === 'dark' ? 'bg-primary/20' : 'bg-primary100';
    const iconBgSecondary = mode === 'dark' ? 'bg-secondary/20' : 'bg-secondary/10';
    const errorBg = mode === 'dark' ? 'bg-red-900/20' : 'bg-red-50';
    const errorBorder = mode === 'dark' ? 'border-red-800' : 'border-red-100';
    const emptyStateBg = mode === 'dark' ? 'bg-gray-800' : 'bg-skeleton';
    const inputText = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const placeholderColor = mode === 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-400';

    // Fetch all courses
    const getAllCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get('/course');
            setCourses(response.data.data);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Failed to load courses. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Handle create course
    const handleCreateCourse = async (courseName) => {
        try {
            const response = await axiosInstance.post('/course', { 
                title: courseName 
            });
            
            const courseId = response.data.data._id || response.data.data.id;
            
            setOpenCreate(false);
            
            navigate(`/admin-panel/course/${courseId}`);
            
        } catch (err) {
            console.error('Error creating course:', err);
            toast.error('Failed to create course. Please try again.');
        }
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`min-h-screen bg-backGray p-6`}>
            {/* Create Course Modal */}
            <CreateCourseModal 
                isOpen={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreateCourse}
                mode={mode}
            />

            {/* Header Section */}
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div>
                    <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>
                        Course Management
                    </h1>
                    <p className={`${textSecondary} text-sm`}>
                        Manage and organize all your courses
                    </p>
                </div>

                <button
                    onClick={() => setOpenCreate(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Create New Course
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className={`${cardBg} rounded-xl p-6 shadow-sm ${hoverShadow} transition-all duration-200 border ${borderColor}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${iconBgPrimary} rounded-xl flex items-center justify-center`}>
                            <BookOpen size={26} className="text-primary" />
                        </div>
                        <div>
                            <div className={`text-3xl font-bold ${textPrimary}`}>
                                {loading ? '...' : courses.length}
                            </div>
                            <div className={`text-sm ${textSecondary} font-medium`}>Total Courses</div>
                        </div>
                    </div>
                </div>

                <div className={`${cardBg} rounded-xl p-6 shadow-sm ${hoverShadow} transition-all duration-200 border ${borderColor}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${iconBgSecondary} rounded-xl flex items-center justify-center`}>
                            <TrendingUp size={26} className="text-secondary" />
                        </div>
                        <div>
                            <div className={`text-3xl font-bold ${textPrimary}`}>
                                {loading ? '...' : courses.filter(c => c.status === 'Active').length}
                            </div>
                            <div className={`text-sm ${textSecondary} font-medium`}>Active Courses</div>
                        </div>
                    </div>
                </div>

                <div className={`${cardBg} rounded-xl p-6 shadow-sm ${hoverShadow} transition-all duration-200 border ${borderColor}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${iconBgPrimary} rounded-xl flex items-center justify-center`}>
                            <Users size={26} className="text-primary" />
                        </div>
                        <div>
                            <div className={`text-3xl font-bold ${textPrimary}`}>
                                {loading ? '...' : courses.reduce((sum, c) => sum + c.students, 0)}
                            </div>
                            <div className={`text-sm ${textSecondary} font-medium`}>Total Students</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className={`${cardBg} rounded-xl p-5 mb-6 shadow-sm border ${borderColor}`}>
                <div className="relative">
                    <Search
                        size={20}
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${textSecondary}`}
                    />
                    <input
                        type="text"
                        placeholder="Search courses by name or instructor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 border-2 ${inputBorder} rounded-lg text-sm outline-none ${inputFocusBorder} transition-colors duration-200 ${inputBg} ${inputText} ${placeholderColor}`}
                    />
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CourseCardSkeleton mode={mode} />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className={`text-center py-16 ${cardBg} rounded-xl shadow-sm border ${errorBorder}`}>
                    <div className="flex justify-center mb-4">
                        <div className={`w-16 h-16 ${errorBg} rounded-full flex items-center justify-center`}>
                            <BookOpen size={32} className="text-red-400" />
                        </div>
                    </div>
                    <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                        Error loading courses
                    </h3>
                    <p className={`${textSecondary} text-sm mb-4`}>
                        {error}
                    </p>
                    <button
                        onClick={getAllCourses}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Courses Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CoursesCard courses={filteredCourses} mode={mode} isAdminPage={true} />
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredCourses.length === 0 && (
                <div className={`text-center py-16 ${cardBg} rounded-xl shadow-sm border ${borderColor}`}>
                    <div className="flex justify-center mb-4">
                        <div className={`w-16 h-16 ${emptyStateBg} rounded-full flex items-center justify-center`}>
                            <BookOpen size={32} className={textSecondary} />
                        </div>
                    </div>
                    <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                        No courses found
                    </h3>
                    <p className={`${textSecondary} text-sm`}>
                        Try adjusting your search criteria
                    </p>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesPage;