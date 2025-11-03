import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Search, Plus, BookOpen, Users, Clock, MoreVertical, TrendingUp, Award } from 'lucide-react';
import CoursesCard from '../../../components/learnhub/CoursesCard';
import axiosInstance from '../../../utils/axiosInstance';
import CourseCardSkeleton from '../../../card/learnhubCards/CourseCardSkeleton';
import CreateCourseModal from '../../../components/admin/CreateCourseModal';
import {toast} from 'react-toastify'

const AdminCoursesPage = () => {
    const navigate = useNavigate(); // Add this
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

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
        <div className="min-h-screen bg-backGray p-6">
            {/* Create Course Modal */}
            <CreateCourseModal 
                isOpen={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreateCourse}
            />

            {/* Header Section */}
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Course Management
                    </h1>
                    <p className="text-gray-600 text-sm">
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
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary100 rounded-xl flex items-center justify-center">
                            <BookOpen size={26} className="text-primary" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">
                                {loading ? '...' : courses.length}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Total Courses</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center">
                            <TrendingUp size={26} className="text-secondary" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">
                                {loading ? '...' : courses.filter(c => c.status === 'Active').length}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Active Courses</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary100 rounded-xl flex items-center justify-center">
                            <Users size={26} className="text-primary" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">
                                {loading ? '...' : courses.reduce((sum, c) => sum + c.students, 0)}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Total Students</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100">
                <div className="relative">
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search courses by name or instructor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-tertiary rounded-lg text-sm outline-none focus:border-primary200 transition-colors duration-200"
                    />
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CourseCardSkeleton />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-red-100">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                            <BookOpen size={32} className="text-red-400" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Error loading courses
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
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
                    <CoursesCard courses={filteredCourses} />
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredCourses.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-skeleton rounded-full flex items-center justify-center">
                            <BookOpen size={32} className="text-gray-400" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No courses found
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Try adjusting your search criteria
                    </p>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesPage;