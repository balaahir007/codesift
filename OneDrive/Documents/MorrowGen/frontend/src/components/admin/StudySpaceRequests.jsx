import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const StudySpaceRequests = () => {
  const [spaceRequest, setSpaceRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const { spaceId } = useParams();

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
      const response = await axiosInstance.patch(`/study-space/requests/${requestId}/approve`,{
        
      });
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

  if (!spaceId) {
    return <div className="p-4 text-red-500">No Study Space ID provided</div>;
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Join Requests</h2>
        {spaceRequest.length > 0 && studySpaceName && (
                <h3 className="text-sm font-medium text-gray-700 mb-2 tracking-normal">
                    Study Space: {studySpaceName}
                </h3>
        )
        }
      {spaceRequest.length === 0 ? (
        <div className="text-gray-500 text-sm">No requests yet</div>
      ) : (
        <div className="space-y-3">
          {spaceRequest.map((request) => (
            <div
              key={request.id}
              className="border rounded-lg p-3 bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {request.user?.username}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{request.user?.email}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleApproval(request.id)}
                    disabled={actionLoading === request.id}
                    className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === request.id ? '...' : 'Accept'}
                  </button>
                  <button
                    onClick={() => handleRejection(request.id)}
                    disabled={actionLoading === request.id}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === request.id ? '...' : 'Reject'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {spaceRequest.length > 0 && (
        <div className="mt-4 text-xs text-gray-500">
          {spaceRequest.filter(req => req.status === 'pending').length} pending •{' '}
          {spaceRequest.length} total
        </div>
      )}
    </div>
  );
};

export default StudySpaceRequests;
