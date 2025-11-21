import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Code, ArrowLeft, CheckCircle, Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'

// Simulated useParams hook for demo - replace with actual react-router-dom in your app


const JoinHackathon = () => {
  const { idAndSlug } = useParams();
  const [mode, setMode] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [teams, setTeams] = useState([]);

  // Split ID and slug
  const id = idAndSlug.slice(0, 36);
  const slug = idAndSlug.slice(37);

  const [formData, setFormData] = useState({
    selectedTeam: '',
    memberName: '',
    email: '',
    phone: '',
    skills: '',
    github: '',
    experience: ''
  });

      const [teamRules,setTeamRules] = useState()
  

      useEffect(()=>{
          const getTeamRules = async()=>{
              try {
                  const res = await axiosInstance.get(`/hackathons/registrationRules/${id}`)
                  console.log("team rule info",res.data.data)
                  if(res.data){
                      setTeamRules(res.data.data)
                  }
              } catch (error) {
                  
              }
          }
          getTeamRules()
      },[id])

  // Theme classes
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';

  // Simulate fetching teams for this hackathon
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setTeams([
  //         { id: 1, name: 'Code Warriors', leader: 'John Doe', members: 3, maxMembers: 5, techStack: 'React, Node.js, MongoDB' },
  //         { id: 2, name: 'Tech Innovators', leader: 'Jane Smith', members: 2, maxMembers: 4, techStack: 'Python, Django, PostgreSQL' },
  //         { id: 3, name: 'AI Pioneers', leader: 'Mike Johnson', members: 4, maxMembers: 6, techStack: 'TensorFlow, PyTorch, FastAPI' },
  //         { id: 4, name: 'Web Wizards', leader: 'Sarah Williams', members: 1, maxMembers: 5, techStack: 'Vue.js, Express, Firebase' }
  //       ]);
  //       setLoading(false);
  //     }, 1000);
  //   }, [id]);

  const handleSubmit = () => {
    if (!formData.teamName || !formData.memberName || !formData.email || !formData.phone || !formData.skills) {
      alert('Please fill all required fields');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        teamName: '',
        memberName: '',
        email: '',
        phone: '',
        skills: '',
        github: '',
        institution: ''
      });
    }, 3000);
  };

  const inputClass = `w-full px-4 py-3 rounded-lg ${cardBg} ${textPrimary} ${borderColor} border focus:outline-none focus:ring-2 focus:ring-primary transition-all`;
  const labelClass = `block text-sm font-medium ${textPrimary} mb-2`;
  const navigate = useNavigate()

  return (
    <div className={`min-h-screen ${bgPrimary} p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className={`flex items-center gap-2 ${textSecondary} hover:${textPrimary} transition-colors mb-4`}>
            <ArrowLeft size={20} />
            <span>Back to Hackathon</span>
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>Join a Team</h1>
            </div>

          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className={`${cardBg} border border-green-500 rounded-lg p-4 mb-6 flex items-center gap-3`}>
            <CheckCircle className="text-green-500" size={24} />
            <div>
              <p className={`font-semibold ${textPrimary}`}>Successfully joined the team!</p>
              <p className={`text-sm ${textSecondary}`}>The team leader will contact you soon.</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {/* {loading ? (
          <div className={`${cardBg} border ${borderColor} rounded-xl p-12 text-center`}>
            <Loader className={`${textSecondary} animate-spin mx-auto mb-4`} size={48} />
            <p className={textSecondary}>Loading available teams...</p>
          </div>
        ) : (
          <>
            {/* Available Teams */}
        {/* <div className={`${cardBg} border ${borderColor} rounded-xl p-6 mb-6`}>
              <h2 className={`text-xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                <Users size={24} />
                Available Teams ({teams.length})
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {teams.map(team => (
                  <div 
                    key={team.id} 
                    className={`${sectionBg} rounded-lg p-4 border ${borderColor} cursor-pointer hover:border-green-500 transition-all ${formData.selectedTeam === team.id.toString() ? 'border-green-500 ring-2 ring-green-500/20' : ''}`}
                    onClick={() => setFormData({...formData, selectedTeam: team.id.toString()})}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-bold ${textPrimary}`}>{team.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${cardBg} ${textSecondary}`}>
                        {team.members}/{team.maxMembers}
                      </span>
                    </div>
                    <p className={`text-sm ${textSecondary} mb-2`}>Led by {team.leader}</p>
                    <p className={`text-xs ${textSecondary}`}>💻 {team.techStack}</p>
                  </div>
                ))}
              </div>
            </div> */}

        {/* </> */}
        {/* )}  */}
        {/* Join Form */}
        <div className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
          <h2 className={`text-xl font-bold ${textPrimary} mb-6`}>Your Information</h2>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Team Name (registered name) *</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className={inputClass}
                placeholder="Ex : CodeHub"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  value={formData.memberName}
                  onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Your Skills *</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className={inputClass}
                  placeholder="React, Node.js, UI/UX"
                />
              </div>
              <div>
                <label className={labelClass}>Institution Skills *</label>
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

            <button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-secondary cursor-pointer text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Users size={20} />
              Join Your Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinHackathon;