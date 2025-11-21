import React, { useState } from 'react';
import {
  Plus,
  Users,
  Mail,
  Phone,
  Trash2,
  Edit2,
  Check,
  X,
  Copy,
  Share2,
  Crown,
  Shield,
  UserCheck,
  UserX,
  Bell,
  Settings,
  Search,
  Filter,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

const HackathonTeamManagement = () => {
  const [mode, setMode] = useState('dark');
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'CodeStorm Legends',
      hackathon: 'CodeStorm 2025',
      members: [
        { id: 1, name: 'Raj Kumar', email: 'raj@example.com', role: 'Leader', status: 'Active', avatar: '👨‍💼' },
        { id: 2, name: 'Priya Singh', email: 'priya@example.com', role: 'Co-Leader', status: 'Active', avatar: '👩‍💻' },
        { id: 3, name: 'Arun Dev', email: 'arun@example.com', role: 'Member', status: 'Active', avatar: '👨‍💻' },
        { id: 4, name: 'Neha Sharma', email: 'neha@example.com', role: 'Member', status: 'Pending', avatar: '👩‍🔬' },
      ],
      maxMembers: 5,
      status: 'Active',
      createdAt: '2025-03-01'
    },
    {
      id: 2,
      name: 'AI Innovators',
      hackathon: 'AI Innovation Challenge',
      members: [
        { id: 5, name: 'Vikram Patel', email: 'vikram@example.com', role: 'Leader', status: 'Active', avatar: '👨‍🏫' },
        { id: 6, name: 'Anjali Gupta', email: 'anjali@example.com', role: 'Member', status: 'Active', avatar: '👩‍💼' },
        { id: 7, name: 'Rohan Singh', email: 'rohan@example.com', role: 'Member', status: 'Active', avatar: '👨‍🔬' },
      ],
      maxMembers: 5,
      status: 'Active',
      createdAt: '2025-03-05'
    }
  ]);

  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [newTeam, setNewTeam] = useState({ name: '', hackathon: '', maxMembers: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Theme colors
  const colors = {
    dark: {
      bg: '#0A1415',
      cardBg: '#1B2E31',
      border: '#294B4E',
      text: '#FFFFFF',
      textSecondary: '#A0ADB5',
      accent: '#0097B2',
      accentLight: '#00C6FF',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444'
    },
    light: {
      bg: '#F9FAFB',
      cardBg: '#FFFFFF',
      border: '#E5E7EB',
      text: '#111827',
      textSecondary: '#6B7280',
      accent: '#0097B2',
      accentLight: '#00C6FF',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444'
    }
  };

  const c = colors[mode];

  const addMember = () => {
    if (!newMember.name || !newMember.email) return;
    const updatedTeams = teams.map(team =>
      team.id === selectedTeam.id
        ? {
            ...team,
            members: [...team.members, {
              id: Math.max(...team.members.map(m => m.id)) + 1,
              name: newMember.name,
              email: newMember.email,
              role: 'Member',
              status: 'Pending',
              avatar: '👤'
            }]
          }
        : team
    );
    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams.find(t => t.id === selectedTeam.id));
    setNewMember({ name: '', email: '' });
    setShowAddMember(false);
  };

  const createTeam = () => {
    if (!newTeam.name || !newTeam.hackathon) return;
    const team = {
      id: Math.max(...teams.map(t => t.id)) + 1,
      ...newTeam,
      members: [],
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTeams([...teams, team]);
    setSelectedTeam(team);
    setNewTeam({ name: '', hackathon: '', maxMembers: 5 });
    setShowTeamForm(false);
  };

  const removeMember = (memberId) => {
    const updatedTeams = teams.map(team =>
      team.id === selectedTeam.id
        ? { ...team, members: team.members.filter(m => m.id !== memberId) }
        : team
    );
    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams.find(t => t.id === selectedTeam.id));
  };

  const updateMemberRole = (memberId, newRole) => {
    const updatedTeams = teams.map(team =>
      team.id === selectedTeam.id
        ? {
            ...team,
            members: team.members.map(m =>
              m.id === memberId ? { ...m, role: newRole } : m
            )
          }
        : team
    );
    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams.find(t => t.id === selectedTeam.id));
  };

  const acceptMember = (memberId) => {
    const updatedTeams = teams.map(team =>
      team.id === selectedTeam.id
        ? {
            ...team,
            members: team.members.map(m =>
              m.id === memberId ? { ...m, status: 'Active' } : m
            )
          }
        : team
    );
    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams.find(t => t.id === selectedTeam.id));
  };

  const copyTeamLink = () => {
    setCopiedId(selectedTeam.id);
    navigator.clipboard.writeText(`https://hackathon.app/join/${selectedTeam.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ backgroundColor: c.bg, color: c.text }} className="min-h-screen">
      {/* Header */}
      <div style={{ backgroundColor: c.cardBg, borderColor: c.border }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00C6FF] bg-clip-text text-transparent">
                Team Management
              </h1>
              <p style={{ color: c.textSecondary }} className="mt-2">Manage your hackathon teams and members</p>
            </div>
            <button
              onClick={() => setShowTeamForm(true)}
              style={{ backgroundColor: c.accent }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
            >
              <Plus className="w-5 h-5" />
              New Team
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Teams Sidebar */}
          <div style={{ backgroundColor: c.cardBg, borderColor: c.border }} className="border rounded-xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Your Teams</h2>
            <div className="space-y-2">
              {teams.map(team => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  style={{
                    backgroundColor: selectedTeam.id === team.id ? c.accent : 'transparent',
                    borderColor: selectedTeam.id === team.id ? c.accent : c.border
                  }}
                  className="w-full p-3 rounded-lg border text-left transition"
                >
                  <p className="font-semibold text-sm">{team.name}</p>
                  <p style={{ color: c.textSecondary }} className="text-xs mt-1">{team.members.length}/{team.maxMembers} members</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTeam && (
              <>
                {/* Team Header */}
                <div style={{ backgroundColor: c.cardBg, borderColor: c.border }} className="border rounded-xl p-8 mb-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedTeam.name}</h2>
                      <div className="flex items-center gap-4 text-sm">
                        <div style={{ color: c.textSecondary }} className="flex items-center gap-1">
                          <span>📋 {selectedTeam.hackathon}</span>
                        </div>
                        <div style={{ color: c.textSecondary }} className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{selectedTeam.members.length}/{selectedTeam.maxMembers}</span>
                        </div>
                        <span style={{ backgroundColor: c.success }} className="px-3 py-1 rounded-full text-white text-xs font-semibold">
                          {selectedTeam.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={copyTeamLink}
                      style={{ backgroundColor: c.accent }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition"
                    >
                      {copiedId === selectedTeam.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedId === selectedTeam.id ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div style={{ backgroundColor: c.bg, borderColor: c.border }} className="border rounded-lg p-4">
                      <p style={{ color: c.textSecondary }} className="text-sm mb-1">Total Members</p>
                      <p className="text-2xl font-bold">{selectedTeam.members.length}</p>
                    </div>
                    <div style={{ backgroundColor: c.bg, borderColor: c.border }} className="border rounded-lg p-4">
                      <p style={{ color: c.textSecondary }} className="text-sm mb-1">Active</p>
                      <p className="text-2xl font-bold">{selectedTeam.members.filter(m => m.status === 'Active').length}</p>
                    </div>
                    <div style={{ backgroundColor: c.bg, borderColor: c.border }} className="border rounded-lg p-4">
                      <p style={{ color: c.textSecondary }} className="text-sm mb-1">Pending</p>
                      <p className="text-2xl font-bold">{selectedTeam.members.filter(m => m.status === 'Pending').length}</p>
                    </div>
                  </div>
                </div>

                {/* Members Section */}
                <div style={{ backgroundColor: c.cardBg, borderColor: c.border }} className="border rounded-xl p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Team Members</h3>
                    {selectedTeam.members.length < selectedTeam.maxMembers && (
                      <button
                        onClick={() => setShowAddMember(!showAddMember)}
                        style={{ backgroundColor: c.accent }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition"
                      >
                        <Plus className="w-4 h-4" />
                        Add Member
                      </button>
                    )}
                  </div>

                  {/* Add Member Form */}
                  {showAddMember && (
                    <div style={{ backgroundColor: c.bg, borderColor: c.border }} className="border rounded-lg p-4 mb-6">
                      <div className="flex gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Member name"
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          style={{ backgroundColor: c.cardBg, borderColor: c.border, color: c.text }}
                          className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          value={newMember.email}
                          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                          style={{ backgroundColor: c.cardBg, borderColor: c.border, color: c.text }}
                          className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={addMember}
                          style={{ backgroundColor: c.success }}
                          className="flex-1 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddMember(false)}
                          style={{ backgroundColor: c.border, color: c.text }}
                          className="flex-1 px-4 py-2 rounded-lg font-semibold hover:opacity-75 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Members List */}
                  <div className="space-y-3">
                    {selectedTeam.members.length === 0 ? (
                      <div style={{ color: c.textSecondary }} className="text-center py-8">
                        <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No members yet. Add your first team member!</p>
                      </div>
                    ) : (
                      selectedTeam.members.map(member => (
                        <div
                          key={member.id}
                          style={{ backgroundColor: c.bg, borderColor: c.border }}
                          className="border rounded-lg p-4 flex items-center justify-between group hover:border-opacity-75 transition"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <span className="text-3xl">{member.avatar}</span>
                            <div>
                              <p className="font-semibold">{member.name}</p>
                              <p style={{ color: c.textSecondary }} className="text-sm">{member.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {member.status === 'Pending' && (
                              <button
                                onClick={() => acceptMember(member.id)}
                                style={{ backgroundColor: c.success }}
                                className="p-2 rounded-lg text-white hover:opacity-90 transition"
                                title="Accept member"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {member.status === 'Active' && (
                              <select
                                value={member.role}
                                onChange={(e) => updateMemberRole(member.id, e.target.value)}
                                style={{ backgroundColor: c.cardBg, borderColor: c.border, color: c.text }}
                                className="px-3 py-1 rounded-lg border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
                              >
                                <option>Member</option>
                                <option>Co-Leader</option>
                                <option>Leader</option>
                              </select>
                            )}

                            <div
                              style={{
                                backgroundColor: member.status === 'Active' ? c.success : c.warning
                              }}
                              className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                            >
                              {member.status}
                            </div>

                            <button
                              onClick={() => removeMember(member.id)}
                              style={{ color: c.danger }}
                              className="p-2 opacity-0 group-hover:opacity-100 transition hover:bg-opacity-10"
                              title="Remove member"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Create Team Modal */}
      {showTeamForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div style={{ backgroundColor: c.cardBg, borderColor: c.border }} className="border rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Create New Team</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Team name"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                style={{ backgroundColor: c.bg, borderColor: c.border, color: c.text }}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              />
              <input
                type="text"
                placeholder="Hackathon name"
                value={newTeam.hackathon}
                onChange={(e) => setNewTeam({ ...newTeam, hackathon: e.target.value })}
                style={{ backgroundColor: c.bg, borderColor: c.border, color: c.text }}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              />
              <div>
                <label style={{ color: c.textSecondary }} className="text-sm">Max Members</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={newTeam.maxMembers}
                  onChange={(e) => setNewTeam({ ...newTeam, maxMembers: parseInt(e.target.value) })}
                  style={{ backgroundColor: c.bg, borderColor: c.border, color: c.text }}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={createTeam}
                  style={{ backgroundColor: c.accent }}
                  className="flex-1 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
                >
                  Create Team
                </button>
                <button
                  onClick={() => setShowTeamForm(false)}
                  style={{ backgroundColor: c.border, color: c.text }}
                  className="flex-1 py-2 rounded-lg font-semibold hover:opacity-75 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonTeamManagement;