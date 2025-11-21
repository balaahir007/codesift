import React, { useState } from 'react';
import { UserPlus, Mail, Phone, Users, Code, Trophy, ArrowLeft, CheckCircle } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance'
import RegistrationClosed from '../../card/RegistrationClosed';
import { showError } from '../../utils/toast';
import { extractErrorMessage } from '../../utils/errorHandler';
import useAuthStore from '../../zustand/auth/useAuthStore';
// Simulated useParams hook for demo - replace with actual react-router-dom in your app
const RegisterHackathon = () => {
    const { idAndSlug } = useParams();
    const { mode } = useThemeStore();
    const [success, setSuccess] = useState(false);

    // Split ID and slug properly
    const id = idAndSlug.slice(0, 36);
    const slug = idAndSlug.slice(37);
    const { authUser } = useAuthStore()
    const [formData, setFormData] = useState({
        teamName: 'Techy Guy',
        teamLeader: authUser?.username || 'Balaji M',
        email: authUser?.email || 'balaahir007@gmail.com',
        phone: authUser?.phone || '',
        techStack: 'Node Js,React,Python',
        projectIdea: '',
        institution: 'The American College',
        github: authUser?.githubUrl || '',
        linkedin: authUser?.linkedinUrl || ''
    });
    const [loading, setLoading] = useState(false)
    // const [addMember]

    const [teamMembers, setTeamMembers] = useState([]);

    const [isRegistrationFull, setIsRegistrationFull] = useState(false);
    const [registrationRules, setRegistrationRules] = useState()
    useEffect(() => {
        const getTeamRules = async () => {
            setLoading(true)
            try {
                const res = await axiosInstance.get(`/hackathons/registrationRules/${id}`)
                if (res.data) {
                    console.log("team rules : ", res.data?.data)
                    setRegistrationRules(res.data?.data)
                    if (res.data.data?.registrationCount >= res.data.data?.maxRegistration) {
                        setIsRegistrationFull(true)
                    }
                }
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        getTeamRules()
    }, [id])




    // Theme classes
    const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
    const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';

    const handleSubmit = async () => {
        try {
            if (!formData.teamName || !formData.teamLeader || !formData.email ||
                !formData.phone || !formData.institution || !formData.techStack) {
                showError('Please fill all required fields', mode);
                return;
            }
            if (teamMembers.length > registrationRules?.maxTeamSize) {
                limitExceeded(registrationRules?.maxTeamSize);
                return;
            }


            const payload = {
                registrationData: { ...formData },
                teamMembers: [...teamMembers]
            }
            const res = await axiosInstance.post(`/hackathons/${id}/register`, payload)

            console.log("registration Data : ", res.data.data)
        } catch (error) {
            const msg = extractErrorMessage(error)
            showError(msg, mode)
        }

        console.log('Registering team for hackathon:', id);
        console.log('Team data:', formData);

        setSuccess(true);

    };

    const inputClass = `w-full px-4 py-3 rounded-lg bg-backGray ${textPrimary} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`;
    const labelClass = `block text-sm font-medium ${textPrimary} mb-2`;

    const navigate = useNavigate()


    const limitExceeded = (size = 2) => {
        const msg = `Team limit reached : ${size}`;
        showError(msg, mode)
    };


    return (
        <div className={`min-h-screen ${bgPrimary} p-6`}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className={`flex items-center gap-2 ${textSecondary} hover:${textPrimary} transition-colors mb-4`}>
                        <ArrowLeft size={20} />
                        <span>Back to Hackathon</span>
                    </button>


                </div>

                {/* Success Message */}
                {success && (
                    <div className={`${cardBg} border border-blue-500 rounded-lg p-4 mb-6 flex items-center gap-3`}>
                        <CheckCircle className="text-blue-500" size={24} />
                        <div>
                            <p className={`font-semibold ${textPrimary}`}>Team registered successfully!</p>
                            <p className={`text-sm ${textSecondary}`}>You'll receive a confirmation email shortly.</p>
                        </div>
                    </div>
                )}

                {/* Info Card */}
                <div className={`${cardBg} border ${borderColor} rounded-xl p-4 sm:p-6 mb-6`}>
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">

                        {/* Icon Section */}
                        <div className="p-2.5 sm:p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
                            <Trophy className="text-blue-500" size={28} />
                        </div>

                        {/* Text Section */}
                        <div className="w-full">
                            <h3 className={`text-base sm:text-lg font-bold ${textPrimary} mb-2`}>
                                Team Registration Guidelines
                            </h3>

                            <ul className={`text-sm sm:text-[15px] ${textSecondary} space-y-1 leading-relaxed`}>
                                <li>• Teams should not exceed the maximum member limit.</li>
                                <li>• You'll be the team leader and can invite others to join.</li>
                                <li>• All team members must be registered participants.</li>
                                <li>• You can add team members later through the dashboard.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {
                    loading ? (
                        <div
                            className={`flex items-center justify-center w-full h-40 rounded-xl ${mode === "dark" ? "bg-gray-900" : "bg-gray-100"
                                }`}
                        >
                            <div
                                className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                                style={{
                                    borderColor:
                                        mode === "dark"
                                            ? "white transparent transparent transparent"
                                            : "black transparent transparent transparent",
                                }}
                            ></div>
                        </div>
                    ) : isRegistrationFull ? (<RegistrationClosed mode={mode} />) : (

                        <div className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
                            <h2 className={`text-xl font-bold ${textPrimary} mb-6`}>Team Details</h2>
                            <div className="space-y-6">
                                {/* Team Information */}
                                <div>
                                    <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                                        <Users size={20} />
                                        Team Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className={labelClass}>Team Name *</label>
                                            <input
                                                type="text"
                                                value={formData.teamName}
                                                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                                className={inputClass}
                                                placeholder="Enter your team name"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">

                                            <div>
                                                <label className={labelClass}>Institution Name *</label>
                                                <input
                                                    type="text"
                                                    value={formData.institution}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, institution: e.target.value })
                                                    }
                                                    className={inputClass}
                                                    placeholder="Ex: IIT Madras, Zoho, Freelancer"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Leader Information */}
                                <div>
                                    <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                                        <UserPlus size={20} />
                                        Team Leader Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>Full Name *</label>
                                                <input
                                                    type="text"
                                                    value={formData.teamLeader}
                                                    onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Email Address *</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="your@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass}>GitHub Profile</label>
                                                <input
                                                    type="url"
                                                    value={formData.github}
                                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="https://github.com/username"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>LinkedIn Profile</label>
                                            <input
                                                type="url"
                                                value={formData.linkedin}
                                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                                className={inputClass}
                                                placeholder="https://linkedin.com/in/username"
                                            />
                                        </div>
                                    </div>



                                </div>

                                <div>
                                    <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                                        <Code size={20} />
                                        Project Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className={labelClass}>Tech Stack *</label>
                                            <input
                                                type="text"
                                                value={formData.techStack}
                                                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                                className={inputClass}
                                                placeholder="React, Node.js, Python, MongoDB, etc."
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>Project Idea (Optional)</label>
                                            <textarea
                                                value={formData.projectIdea}
                                                onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })}
                                                className={`${inputClass} min-h-32 resize-none`}
                                                placeholder="Briefly describe your project idea or what you plan to build..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (teamMembers.length >= registrationRules?.maxTeamSize) {
                                            limitExceeded(registrationRules?.maxTeamSize);
                                            return;
                                        }

                                        setTeamMembers([
                                            ...teamMembers,
                                            { name: "", email: "", phone: "" }
                                        ]);
                                    }}
                                    // disabled={teamMembers.length >= registrationRules?.maxTeamSize}

                                    className="group flex items-center gap-2 px-4 py-2 bg-primary 
                     text-white rounded-xl shadow-md hover:shadow-lg 
                     hover:bg-secondary transition-all duration-200"
                                >
                                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="font-medium">Add Member</span>
                                </button>

                                {teamMembers.map((member, index) => (
                                    <div key={index} className="mt-6">
                                        <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                                            <Users size={20} />
                                            Member {index + 1}
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Full Name *</label>
                                                    <input
                                                        type="text"
                                                        value={member.name}
                                                        onChange={(e) => {
                                                            const updated = [...teamMembers];
                                                            updated[index].name = e.target.value;
                                                            setTeamMembers(updated);
                                                        }}
                                                        className={inputClass}
                                                        placeholder="Member full name"
                                                    />
                                                </div>

                                                <div>
                                                    <label className={labelClass}>Email *</label>
                                                    <input
                                                        type="email"
                                                        value={member.email}
                                                        onChange={(e) => {
                                                            const updated = [...teamMembers];
                                                            updated[index].email = e.target.value;
                                                            setTeamMembers(updated);
                                                        }}
                                                        className={inputClass}
                                                        placeholder="member@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClass}>Phone *</label>
                                                <input
                                                    type="tel"
                                                    value={member.phone}
                                                    onChange={(e) => {
                                                        const updated = [...teamMembers];
                                                        updated[index].phone = e.target.value;
                                                        setTeamMembers(updated);
                                                    }}
                                                    className={inputClass}
                                                    placeholder="+91 9876543210"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}


                                {/* Project Details */}


                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <UserPlus size={20} />
                                    Register Team
                                </button>
                            </div>
                        </div>
                    )
                }
                {/* Registration Form */}

            </div>
        </div>
    );
};

export default RegisterHackathon;