import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserPlus, Check, X, Clock, Users, Mail, Calendar, Moon, Sun, AlertCircle } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import useThemeStore from '../../zustand/themeStore';

const StudySpaceRequests = () => {
  const [spaceRequest, setSpaceRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const { spaceId } = useParams();
  const {mode} = useThemeStore()
  // Theme colors
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-gray-50';
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
  const headerBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';

  const studySpaceName = spaceRequest.length > 0
    ? spaceRequest[0].studySpace?.name || 'Unnamed Space'
    : '';

  useEffect(() => {
    if (!spaceId) return;

    setLoading(true);
    setSpaceRequest([]);

    const fetchRequests = async () => {
      try {
        const response = await axiosInstance(`/study-space/requests/${spaceId}`);
        if (response.data.success) {
          setSpaceRequest(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [spaceId]);

  const handleApproval = async (requestId) => {
    setActionLoading(requestId);
    try {
      const response = await axiosInstance.patch(`/study-space/requests/${requestId}/approve`, {});
      if (response.data.success) {
        setSpaceRequest(prev =>
          prev.map(req =>
            req.id === requestId
              ? { ...req, status: 'approved' }
              : req
          )
        );
      }
    } catch (error) {
      console.error('Error approving request:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejection = async (requestId) => {
    setActionLoading(requestId);
    try {
      const response = await axiosInstance.patch(`/study-space/requests/${requestId}/reject`);
      if (response.data.success) {
        setSpaceRequest(prev =>
          prev.map(req =>
            req.id === requestId
              ? { ...req, status: 'rejected' }
              : req
          )
        );
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: mode === 'dark' ? 'bg-yellow-900/30 border-yellow-800/50' : 'bg-yellow-100 border-yellow-200',
        text: mode === 'dark' ? 'text-yellow-400' : 'text-yellow-700',
        icon: <Clock className="w-3 h-3" />
      },
      approved: {
        bg: mode === 'dark' ? 'bg-green-900/30 border-green-800/50' : 'bg-green-100 border-green-200',
        text: mode === 'dark' ? 'text-green-400' : 'text-green-700',
        icon: <Check className="w-3 h-3" />
      },
      rejected: {
        bg: mode === 'dark' ? 'bg-red-900/30 border-red-800/50' : 'bg-red-100 border-red-200',
        text: mode === 'dark' ? 'text-red-400' : 'text-red-700',
        icon: <X className="w-3 h-3" />
      }
    };

    const badge = badges[status] || badges.pending;
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} flex items-center gap-1.5`}>
        {badge.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!spaceId) {
    return (
      <div className={`min-h-screen ${bgPrimary} ${textPrimary} flex items-center justify-center p-4`}>
        <div className={`${bgCard} rounded-xl p-6 border ${borderColor} max-w-md w-full text-center`}>
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>No Study Space ID</h3>
          <p className={`${textSecondary} text-sm`}>Please provide a valid Study Space ID to view requests.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${bgPrimary} ${textPrimary} p-4 sm:p-6 lg:p-8`}>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className={`h-8 ${mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-200'} rounded w-1/3`}></div>
            <div className={`h-6 ${mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-200'} rounded w-1/4`}></div>
            {[1, 2, 3].map(i => (
              <div key={i} className={`${bgCard} rounded-xl p-6 border ${borderColor}`}>
                <div className="space-y-3">
                  <div className={`h-4 ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-200'} rounded w-2/3`}></div>
                  <div className={`h-4 ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-200'} rounded w-1/2`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pendingCount = spaceRequest.filter(req => req.status === 'pending').length;
  const approvedCount = spaceRequest.filter(req => req.status === 'approved').length;
  const rejectedCount = spaceRequest.filter(req => req.status === 'rejected').length;

  return (
    <div className={`min-h-screen  ${textPrimary} transition-colors duration-200`}>
      

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className={`${headerBg} rounded-xl p-6 sm:p-8 border ${borderColor} mb-6`}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-lg">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${textPrimary}`}>Join Requests</h1>
              </div>
              {studySpaceName && (
                <div className="flex items-center gap-2 mt-3">
                  <Users className={`w-4 h-4 ${textSecondary}`} />
                  <p className={`${textSecondary} text-sm sm:text-base`}>
                    Study Space: <span className={`font-medium ${textPrimary}`}>{studySpaceName}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Stats Summary */}
            {spaceRequest.length > 0 && (
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <div className={`${bgCard} px-4 py-2 rounded-lg border ${borderColor}`}>
                  <div className={`text-xs ${textSecondary} mb-1`}>Pending</div>
                  <div className={`text-xl font-bold text-yellow-500`}>{pendingCount}</div>
                </div>
                <div className={`${bgCard} px-4 py-2 rounded-lg border ${borderColor}`}>
                  <div className={`text-xs ${textSecondary} mb-1`}>Approved</div>
                  <div className={`text-xl font-bold text-green-500`}>{approvedCount}</div>
                </div>
                <div className={`${bgCard} px-4 py-2 rounded-lg border ${borderColor}`}>
                  <div className={`text-xs ${textSecondary} mb-1`}>Rejected</div>
                  <div className={`text-xl font-bold text-red-500`}>{rejectedCount}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Requests List */}
        {spaceRequest.length === 0 ? (
          <div className={` rounded-xl p-12 border ${borderColor} text-center`}>
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100'} flex items-center justify-center`}>
              <UserPlus className={`w-10 h-10 ${textSecondary}`} />
            </div>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>No Requests Yet</h3>
            <p className={`${textSecondary} text-sm`}>
              When users request to join your study space, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {spaceRequest.map((request) => (
              <div
                key={request.id}
                className={`${bgCard} rounded-xl p-4 sm:p-6 border ${borderColor} ${hoverBg} transition-all hover:shadow-lg`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#0097B2] to-[#00B2A9] flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}>
                        {request.user?.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className={`text-base sm:text-lg font-semibold ${textPrimary} truncate`}>
                            {request.user?.username || 'Unknown User'}
                          </h3>
                          {getStatusBadge(request.status)}
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${textSecondary} flex-shrink-0`} />
                            <p className={`${textSecondary} text-sm truncate`}>
                              {request.user?.email || 'No email provided'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className={`w-4 h-4 ${textSecondary} flex-shrink-0`} />
                            <p className={`${textSecondary} text-sm`}>
                              {formatDate(request.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {request.status === 'pending' && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleApproval(request.id)}
                          disabled={actionLoading === request.id}
                          className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {actionLoading === request.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Accept</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleRejection(request.id)}
                          disabled={actionLoading === request.id}
                          className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {actionLoading === request.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4" />
                              <span>Reject</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {spaceRequest.length > 0 && (
          <div className={`mt-6 ${bgCard} rounded-xl p-4 border ${borderColor}`}>
            <div className={`flex items-center justify-between flex-wrap gap-2 text-sm ${textSecondary}`}>
              <span>Total Requests: <span className={`font-semibold ${textPrimary}`}>{spaceRequest.length}</span></span>
              <span>•</span>
              <span>Pending: <span className="font-semibold text-yellow-500">{pendingCount}</span></span>
              <span>•</span>
              <span>Approved: <span className="font-semibold text-green-500">{approvedCount}</span></span>
              <span>•</span>
              <span>Rejected: <span className="font-semibold text-red-500">{rejectedCount}</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySpaceRequests;