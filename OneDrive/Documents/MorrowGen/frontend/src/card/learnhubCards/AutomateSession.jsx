import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const data = {
    "title": "Week 1 - Frontend Class",
    "googleMeet": "https://meet.google.com/xqs-wmmf-mck",
    "whatsappLink": "https://chat.whatsapp.com/BApEwb8TNUJ1Pt7QEi3oxH",
    "imagePath": "../assets/week.jpg",
    'groupNames': ['dummy']
}
const AutomateSessionButton = () => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            await axiosInstance.post('/session/automate-session', {})
        } catch (error) {
            console.log(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`
        flex items-center px-6 py-3 rounded-xl font-semibold text-white
        transition-all duration-300 ease-in-out
        disabled:opacity-60 disabled:cursor-not-allowed
        shadow-md hover:shadow-xl hover:scale-105
      `}
            style={{
                backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            }}
        >
            {loading && (
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? 'Loading...' : 'Automate Session'}
        </button>
    );
};

export default AutomateSessionButton;
