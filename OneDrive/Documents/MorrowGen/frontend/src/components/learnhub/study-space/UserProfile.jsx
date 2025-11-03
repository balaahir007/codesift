import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

const UserProfile = () => {
    const { userId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const fetchProfile = async (id) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/auth/get-profile/${id}`);
            setUser(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.response?.data || "Error fetching user profile");
        }
    };

    useEffect(() => {
        if (userId) fetchProfile(userId);
    }, [userId]);

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
    if (!user) return null;

    return (
        <div className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-md p-6 space-y-4">
            <div className="flex items-center space-x-4">
                <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                    <p className="text-sm text-gray-500">Unique ID: {user.uniqueId}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 text-gray-700">
                <div><span className="font-medium">Email:</span> {user.email}</div>
                <div><span className="font-medium">Mobile:</span> {user.mobileNumber || 'Not provided'}</div>
                <div><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default UserProfile;
