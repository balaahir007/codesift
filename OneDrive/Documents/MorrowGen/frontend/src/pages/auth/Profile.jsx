import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Award, BookOpen, Target } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
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
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
          
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-[#0097B2] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#007a94] transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-[#00B2A9] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#009590] transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] p-8 text-white relative">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-12 h-12 text-black" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 bg-white text-[#0097B2] p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm w-full mb-3"
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
                )}
                
                <div className="flex items-center gap-4 text-white text-opacity-90">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {profileData.course}
                  </span>
                  <span>•</span>
                  <span>{profileData.year}</span>
                </div>
                <div className="text-white text-opacity-75 mt-1">{profileData.university}</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#0097B2] rounded-full"></div>
              Contact Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-600 mb-2">
                    <Mail className="w-4 h-4 text-[#0097B2]" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-800">{profileData.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-gray-600 mb-2">
                    <Phone className="w-4 h-4 text-[#00B2A9]" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-800">{profileData.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 text-[#0097B2]" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-800">{profileData.location}</p>
                  )}
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 text-[#00B2A9]" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-800">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-[#00B2A9] rounded-full"></div>
            About Me
          </h3>
          
          {isEditing ? (
            <textarea
              value={editData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none resize-none"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Interests */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#0097B2] rounded-full"></div>
              Interests
            </h3>
            
            <div className="space-y-3">
              {(isEditing ? editData.interests : profileData.interests).map((interest, index) => (
                <div key={index} className="flex items-center gap-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) => handleArrayChange('interests', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none text-sm"
                      />
                      <button
                        onClick={() => removeArrayItem('interests', index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="bg-[#E0F2F5] text-[#0097B2] px-3 py-1 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button
                  onClick={() => addArrayItem('interests')}
                  className="text-[#0097B2] hover:text-[#007a94] text-sm font-medium flex items-center gap-1"
                >
                  + Add Interest
                </button>
              )}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#00B2A9] rounded-full"></div>
              Goals
            </h3>
            
            <div className="space-y-3">
              {(isEditing ? editData.goals : profileData.goals).map((goal, index) => (
                <div key={index} className="flex items-start gap-3">
                  {isEditing ? (
                    <div className="flex items-start gap-2 w-full">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => handleArrayChange('goals', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:outline-none text-sm"
                      />
                      <button
                        onClick={() => removeArrayItem('goals', index)}
                        className="text-red-500 hover:text-red-700 p-1 mt-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Target className="w-4 h-4 text-[#00B2A9] mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{goal}</span>
                    </>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button
                  onClick={() => addArrayItem('goals')}
                  className="text-[#00B2A9] hover:text-[#009590] text-sm font-medium flex items-center gap-1"
                >
                  + Add Goal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;