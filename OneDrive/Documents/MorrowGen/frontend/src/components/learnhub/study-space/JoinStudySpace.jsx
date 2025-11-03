import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

const JoinStudySpace = () => {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Joining study space...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const join = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/study-space/join', {
        inviteCode,
      });

      console.log('Join response:', response.data);

      if (response.data.success) {
        setMessage('🎉 Request sent successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(response.data.message || '❌ Failed to join');
      }
    } catch (err) {
      console.error('Full error:', err);
      if (err.response) {
        console.error('Backend Error:', err.response.data);
        setError(err.response.data.message || '❌ Server responded with an error');
      } else {
        setError('❌ Network or server error.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!inviteCode) {
      setError('⚠️ Invite link not found');
      setLoading(false);
    } else {
      join();
    }
  }, [inviteCode]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Study Space</h2>

        {error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : (
          <p className="text-gray-600 mb-4">{message}</p>
        )}

        {error && (
          <button
            onClick={join}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary cursor-pointer'
            }`}
          >
            {loading ? 'Joining...' : 'Retry'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JoinStudySpace;
