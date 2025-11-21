import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { Users, BookOpen, Award, Calendar, Search, Filter } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';

const TeacherStudentsPage = () => {
    const [studySpaces, setStudySpaces] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    const { mode } = useThemeStore()
    useEffect(() => {
        const getAllMembersWithAllStudySpaces = async () => {
            const res = await axiosInstance.get('/study-space/getAll/members')
            console.log("response Data : ", res.data)
            if (res?.data) {
                setStudySpaces(res?.data.data)
            }

        }
        getAllMembersWithAllStudySpaces()
    }, [])




    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className={`${bgCard} ${borderColor} border rounded-xl p-6 transition-all hover:shadow-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm ${textSecondary} mb-1`}>{label}</p>
                    <p className={`text-3xl font-bold ${textPrimary}`}>{value}</p>
                </div>
                <div className={`${color} p-4 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );

    const getRoleBadge = (role) => {
        if (role === 'teacher') {
            return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        }
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    };
    const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-gray-50';
    const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
    const headerBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';

    const [users, setUsers] = useState([]);
    const userMap = new Map();

    useEffect(() => {
        if (studySpaces?.length > 0) {
            // Flatten all members with study space info
            const allMembers = studySpaces.flatMap(space =>
                (space.members || []).map(member => {
                    if (!userMap.has(member.id)) {
                        userMap.set(member.id, {
                            ...member,
                            studySpaces: [
                                {
                                    studySpaceName: space.name,
                                    studySpaceId: space.id,
                                    domain: space.domain,
                                    techSkills: space.techSkills,
                                    tags: space.tags
                                }
                            ]
                        })
                    } else {
                        const existing = userMap.get(member.id)
                        existing.studySpaces.push({
                            studySpaceName: space.name,
                            studySpaceId: space.id,
                            domain: space.domain,
                            techSkills: space.techSkills,
                            tags: space.tags
                        })
                        userMap.set(member.id, existing)
                    }

                })
            );

            // Remove duplicate users by ID
            const allMembersValues = Array.from(userMap.values());
            setUsers(allMembersValues);
        }
        console.log("users : ", users)
    }, [studySpaces]);



    const filteredMembers = users.filter(member => {
        const name = member?.username?.toLowerCase() || "";
        const email = member?.email?.toLowerCase() || "";
        const studySpaceNames = member?.studySpaces?.map(space => space.studySpaceName?.toLowerCase() || "").join(" ");


        const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
            email.includes(searchTerm.toLowerCase()) ||
            studySpaceNames.includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || member.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const totalStudents = users.filter(m => m.role === 'user').length;
    const totalTeachers = users.filter(m => m.role === 'teacher').length;
    const totalSpaces = studySpaces.length;

    return (
        <div className={`min-h-screen  p-4 md:p-6 lg:p-8`}>
            {/* Header */}
            <div className={`${headerBg} ${borderColor} border rounded-xl p-6 mb-6`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className={`text-2xl md:text-3xl font-bold ${textPrimary} mb-2`}>
                            Students & Members
                        </h1>
                        <p className={textSecondary}>
                            Manage and monitor all students across your study spaces
                        </p>
                    </div>

                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                <StatCard
                    icon={Users}
                    label="Total Students"
                    value={totalStudents}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Award}
                    label="Total Teachers"
                    value={totalTeachers}
                    color="bg-purple-500"
                />
                <StatCard
                    icon={BookOpen}
                    label="Study Spaces"
                    value={totalSpaces}
                    color="bg-green-500"
                />
            </div>

            {/* Filters */}
            <div className={`${bgCard} ${borderColor} border rounded-xl p-4 md:p-6 mb-6`}>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or study space..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 ${bgPrimary} ${borderColor} border rounded-lg ${textPrimary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="relative min-w-[200px]">
                        <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 ${bgPrimary} ${borderColor} border rounded-lg ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                        >
                            <option value="all">All Roles</option>
                            <option value="user">Students</option>
                            <option value="teacher">Teachers</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Members List */}
            <div className={`${bgCard} ${borderColor} border rounded-xl overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`${headerBg} ${borderColor} border-b`}>
                            <tr>
                                <th className={`px-4 md:px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>
                                    Member
                                </th>
                                <th className={`px-4 md:px-6 py-4 text-left text-sm font-semibold ${textPrimary} hidden md:table-cell`}>
                                    Study Space
                                </th>
                                <th className={`px-4 md:px-6 py-4 text-left text-sm font-semibold ${textPrimary} hidden lg:table-cell`}>
                                    Domain
                                </th>
                                <th className={`px-4 md:px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className={`px-6 py-12 text-center ${textSecondary}`}>
                                        No members found matching your criteria
                                    </td>
                                </tr>
                            ) : (
                                (filteredMembers || []).map((member, idx) => (
                                    <tr key={`${member.id}-${idx}`} className={hoverBg}>
                                        <td className="px-4 md:px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={member.profilePicture}
                                                    alt={member.username}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className="min-w-0">
                                                    <p className={`font-medium ${textPrimary} truncate`}>
                                                        {member.username}
                                                    </p>
                                                    <p className={`text-sm ${textSecondary} truncate`}>
                                                        {member.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-4 md:px-6 py-4 hidden md:table-cell`}>
                                            <div>
                                                {member.studySpaces.map((s, i) => (
                                                    <div key={i} className="mb-2">

                                                        <p key={i} className={`font-medium ${textPrimary}`}>
                                                            {s.studySpaceName}
                                                        </p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {(s?.tags || []).slice(0, 2).map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-xs px-2 py-1 ${bgPrimary} ${textSecondary} rounded`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </td>
                                        <td className={`px-4 md:px-6 py-4 hidden lg:table-cell`}>
                                            <span className={`text-sm ${textSecondary} capitalize`}>
                                                {member.domain}
                                            </span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(member.role)}`}>
                                                {member.role === 'teacher' ? 'Teacher' : 'Student'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Member Count */}
            <div className="mt-4 text-center">
                <p className={textSecondary}>
                    Showing {filteredMembers.length} of {users.length} members
                </p>
            </div>
        </div>
    )
}

export default TeacherStudentsPage
