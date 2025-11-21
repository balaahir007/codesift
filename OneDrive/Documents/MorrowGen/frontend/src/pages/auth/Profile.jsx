import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Target, Briefcase, GraduationCap, Heart, Moon, Sun, Settings } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';
import profile from '../../../public/images/learnTogether.webp'

const Profile = () => {
  const { mode } = useThemeStore()
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    profilePicture: profile || '',
    location: 'Mumbai, Maharashtra',
    dateOfBirth: '1998-05-15',
    bio: 'Computer Science student passionate about web development and AI. Always eager to learn new technologies and solve challenging problems.',
    university: 'Indian Institute of Technology',
    course: 'Computer Science Engineering',
    year: '3rd Year',
    interests: ['Web Development', 'Artificial Intelligence', 'Data Science', 'Mobile Apps'],
    goals: ['Land internship at tech company', 'Complete React certification', 'Build portfolio projects']
  });

  const [editData, setEditData] = useState({ ...profileData });

  // Theme colors
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-gray-50';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const bgTertiary = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const cardHover = mode === 'dark' ? 'hover:bg-[#1F2937]' : 'hover:bg-gray-50';
  const inputBg = mode === 'dark' ? 'bg-[#1B2E31] border-gray-700' : 'bg-white border-gray-300';
  const accentGradient = mode === 'dark'
    ? 'from-primary  to-secondary'
    : 'from-secondary  to-primary';

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...editData[field]];
    newArray[index] = value;
    setEditData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setEditData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = editData[field].filter((_, i) => i !== index);
    setEditData(prev => ({ ...prev, [field]: newArray }));
  };

  return (
    <div className={`min-h-screen bg-backGray transition-colors duration-300`}>
      {/* Top Navigation */}
      <div className={`+  ${borderColor} sticky top-0 z-0 `}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4  ">
              <div className={`w-10 h-10 rounded-xl   flex items-center justify-center`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${textPrimary}`}>Profile</h1>
                <p className={`text-sm ${textSecondary}`}>Manage your account</p>
              </div>
            </div>

            <div className="flex items-center gap-4">

              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4 z-0" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`${bgTertiary} ${textPrimary} px-5 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2`}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Hero Card */}
        <div className={`${bgSecondary} rounded-3xl overflow-hidden border ${borderColor} shadow-xl`}>
          <div className="relative">
            {/* Gradient Background */}
            {
              editData.profilePicture ? (
                <img src={editData.profilePicture} alt="" className='h-48 object-cover w-full' />
              ) : (

                <div className={`h-48 bg-gradient-to-br ${accentGradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
                </div>
              )
            }

            {/* Profile Content */}
            <div className="px-8 pb-8">
              <div className="flex items-end gap-6 md:-mt-8">
                {/* Avatar */}
                <div className="relative">
                  <div className={` w-16 h-16 -translate-y-30 md:translate-y-0 md:w-32 md:h-32 rounded-2xl ${bgSecondary} border-4 ${mode === 'dark' ? 'border-[#37424e]' : 'border-gray-50'} shadow-2xl flex items-center justify-center`}>
                    <div className={`w-full  h-full rounded-2xl bg-gradient-to-br ${accentGradient} flex items-center justify-center`}>
                      <User className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Name and Title */}
                <div className="flex-1 pb-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`text-3xl font-bold ${inputBg} ${textPrimary} border rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Full Name"
                    />
                  ) : (
                    <h2 className={`text-3xl font-bold ${textPrimary}`}>{profileData.name}</h2>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2 sm:gap-4">
                    {/* Course and Year */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${bgTertiary}`}>
                          <GraduationCap className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className={`text-sm sm:text-base ${textSecondary} font-medium`}>
                          {profileData.course}
                        </span>
                      </div>

                      {/* Dot separator */}
                      <span className={`hidden sm:inline ${textSecondary}`}>•</span>

                      <span className={`text-sm sm:text-base ${textSecondary}`}>
                        {profileData.year}
                      </span>
                    </div>

                    {/* University Name */}
                    <p
                      className={`text-sm sm:text-base ${textSecondary} sm:mt-0 mt-1 break-words text-left sm:text-right`}
                    >
                      {profileData.university}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className={`${bgSecondary} rounded-2xl p-6 border ${borderColor} shadow-lg`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-6 flex items-center gap-2`}>
                <Settings className="w-5 h-5 text-purple-500" />
                Contact Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className={`flex items-center gap-2 ${textSecondary} mb-2 text-sm font-medium`}>
                      <Mail className="w-4 h-4 text-blue-500" />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-2.5 ${inputBg} ${textPrimary} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    ) : (
                      <p className={`${textPrimary} font-medium`}>{profileData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className={`flex items-center gap-2 ${textSecondary} mb-2 text-sm font-medium`}>
                      <Phone className="w-4 h-4 text-green-500" />
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-2.5 ${inputBg} ${textPrimary} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    ) : (
                      <p className={`${textPrimary} font-medium`}>{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`flex items-center gap-2 ${textSecondary} mb-2 text-sm font-medium`}>
                      <MapPin className="w-4 h-4 text-red-500" />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={`w-full px-4 py-2.5 ${inputBg} ${textPrimary} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    ) : (
                      <p className={`${textPrimary} font-medium`}>{profileData.location}</p>
                    )}
                  </div>

                  <div>
                    <label className={`flex items-center gap-2 ${textSecondary} mb-2 text-sm font-medium`}>
                      <Calendar className="w-4 h-4 text-purple-500" />
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={`w-full px-4 py-2.5 ${inputBg} ${textPrimary} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    ) : (
                      <p className={`${textPrimary} font-medium`}>{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className={`${bgSecondary} rounded-2xl p-6 border ${borderColor} shadow-lg`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                <User className="w-5 h-5 text-blue-500" />
                About Me
              </h3>

              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows="4"
                  className={`w-full px-4 py-3 ${inputBg} ${textPrimary} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className={`${textSecondary} leading-relaxed`}>{profileData.bio}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Interests */}
            <div className={`${bgSecondary} rounded-2xl p-6 border ${borderColor} shadow-lg`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                <Heart className="w-5 h-5 text-pink-500" />
                Interests
              </h3>

              <div className="space-y-2">
                {(isEditing ? editData.interests : profileData.interests).map((interest, index) => (
                  <div key={index}>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) => handleArrayChange('interests', index, e.target.value)}
                          className={`flex-1 px-3 py-2 ${inputBg} ${textPrimary} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm`}
                        />
                        <button
                          onClick={() => removeArrayItem('interests', index)}
                          className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-10 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className={`${bgTertiary} ${textPrimary} px-4 py-2 rounded-lg text-sm font-medium ${cardHover} transition-all`}>
                        {interest}
                      </div>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <button
                    onClick={() => addArrayItem('interests')}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1 mt-2 px-2 py-1 rounded-lg hover:bg-blue-500 hover:bg-opacity-10 transition-all"
                  >
                    + Add Interest
                  </button>
                )}
              </div>
            </div>

            {/* Goals */}
            <div className={`${bgSecondary} rounded-2xl p-6 border ${borderColor} shadow-lg`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                <Target className="w-5 h-5 text-green-500" />
                Goals
              </h3>

              <div className="space-y-3">
                {(isEditing ? editData.goals : profileData.goals).map((goal, index) => (
                  <div key={index}>
                    {isEditing ? (
                      <div className="flex items-start gap-2">
                        <input
                          type="text"
                          value={goal}
                          onChange={(e) => handleArrayChange('goals', index, e.target.value)}
                          className={`flex-1 px-3 py-2 ${inputBg} ${textPrimary} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm`}
                        />
                        <button
                          onClick={() => removeArrayItem('goals', index)}
                          className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-10 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <span className={`${textSecondary} text-sm leading-relaxed`}>{goal}</span>
                      </div>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <button
                    onClick={() => addArrayItem('goals')}
                    className="text-green-500 hover:text-green-600 text-sm font-medium flex items-center gap-1 mt-2 px-2 py-1 rounded-lg hover:bg-green-500 hover:bg-opacity-10 transition-all"
                  >
                    + Add Goal
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;