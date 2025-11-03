import React, { useState } from 'react';
import SessionForm from '../../components/admin/SessionForm';
import SessionCard from '../../card/admin/SessionCard';
import useSessionManagementStore from '../../zustand/sessionManagementStore/useSessionManagementStore';
import { useEffect } from 'react';
import CreateGroupForm from '../../components/admin/CreateGroupForm';
import AddParticipantForm from '../../components/admin/AddParticipantForm';
import SessionCardSkeleton from '../../components/admin/SessionFormSkeleton';

const SessionManagement = () => {
    const [sessionFormOpen, setSessionFormOpen] = useState(false);
    const [groupFormOpen, setGroupFormOpen] = useState(false);
    const [participantFormOpen, setParticipantFormOpen] = useState(false);

    // Destructure everything from the store
    const {
        getAllSession,
        getAllGroups,
        removeSession,
        isremoveSessionLoading,
        groupsData,
        getAllParticipants,
        participants,
        sessionData, // This is the array we are observing
        isLoading,
        participantLoading,
        publishSession,
        isPublishSessionLoading
    } = useSessionManagementStore();

    // Fetch initial data on component mount
    useEffect(() => {
        console.log("SessionManagement: Initial data fetch triggered.");
        getAllParticipants();
        getAllGroups();
        getAllSession();
    }, []);

    // Effect to log sessionData whenever it changes. This is crucial.
    useEffect(() => {
        console.log("SessionManagement: sessionData updated. Current count:", sessionData.length, "Data:", sessionData.map(s => ({ id: s.id, title: s.title, status: s.status })));
    }, [sessionData]); // This effect runs every time sessionData changes

    const handleRemove = async (id) => {
        console.log("SessionManagement: handleRemove called for ID:", id);
        try {
            await removeSession(id); // Call the Zustand store action
            console.log("SessionManagement: removeSession (Zustand action) completed for ID:", id);
        } catch (error) {
            console.error("SessionManagement: Error during session removal for ID:", id, error);
        }
    };

    const [pendingSessionCount, setPendingSessionCount] = useState(0);
    const [completedSessionCount, setCompletedSessionCount] = useState(0);

    // Effect to update counts based on sessionData changes
    useEffect(() => {
        let pending = 0;
        let completed = 0;

        sessionData?.forEach((session) => {
            if (session.status === 'pending') {
                pending++;
            } else if (session.status === 'completed') {
                completed++;
            }
        });

        setPendingSessionCount(pending);
        setCompletedSessionCount(completed);
        console.log("SessionManagement: Counts updated - Pending:", pending, "Completed:", completed);
    }, [sessionData]); 

    const publishScheduleSession = async(data)=>{
        await publishSession(data)
    }

    return (
        <div>
            <div className='flex gap-4'>
                <div className="bg-white  shadow p-6 border border-[#E0F2F5] w-full rounded-2xl">
                    <h2 className="text-2xl font-semibold text-[#0097B2] mb-2">Session Management</h2>
                    <p className="text-gray-600 mb-6 text-sm md:text-md">
                        Manage your weekly sessions by creating, editing, and assigning sessions to specific weeks. Click the button below to add a new session. Sessions help organize course content, streamline communication with participants, and ensure a structured learning path. You can also monitor engagement and update session details anytime.
                    </p>
                    <div className='flex gap-4 text-sm flex-col md:flex-row'>
                        <button
                            className="bg-[#0097B2] hover:bg-[#00B2A9] cursor-pointer hover:scale-105 text-white px-4 py-3 rounded-xl transition duration-300"
                            onClick={() => setSessionFormOpen(true)}
                        >
                            + Create New Session
                        </button>
                        <button
                            className="bg-secondary text-white cursor-pointer hover:scale-105 shadow-md px-4 py-3 rounded-xl transition duration-300"
                            onClick={() => setGroupFormOpen(true)}
                        >
                            + Create New Group
                        </button>
                        <button
                            className="bg-[#ffffff] cursor-pointer hover:scale-105 shadow-md px-4 py-3 rounded-xl transition duration-300"
                            onClick={() => setParticipantFormOpen(true)}
                        >
                            + Add Participants
                        </button>
                    </div>
                    {sessionFormOpen && (
                        <div className="fixed inset-0 bg-black/50 duration-200 flex items-center justify-center z-50">
                            <div className="bg-white p-6 mx-2 rounded-lg shadow-lg w-full max-w-md">
                                <SessionForm onClose={() => setSessionFormOpen(false)} />
                            </div>
                        </div>
                    )}
                    {groupFormOpen && (
                        <div className="fixed inset-0 bg-black/50 duration-200 flex items-center justify-center z-50">
                            <div className="bg-white p-6 mx-2 rounded-lg shadow-lg w-full max-w-md">
                                <CreateGroupForm participants={participants} onClose={() => setGroupFormOpen(false)} />
                            </div>
                        </div>
                    )}
                    {participantFormOpen && (
                        <div className="fixed inset-0 bg-black/50 duration-200 flex items-center justify-center z-50">
                            <div className="bg-white p-6 mx-2 rounded-lg shadow-lg w-full max-w-md">
                                <AddParticipantForm onClose={() => setParticipantFormOpen(false)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 sm:px-8 py-6">
                <div className="mb-10">
                    {pendingSessionCount > 0 && (
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            Pending Sessions
                        </h1>
                    )}
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {isLoading && Array(3).fill(null).map((_, index) => (
                            <SessionCardSkeleton key={`pending-skeleton-${index}`} />
                        ))}
                        {!isLoading &&
                            sessionData
                                .filter(event => event.status !== "completed")
                                .map((event) => (
                                    <SessionCard key={event.id} publishSession={publishScheduleSession} event={event} onRemove={handleRemove} />
                                ))
                        }
                        {/* If no pending sessions and not loading, display a message */}
                        {!isLoading && pendingSessionCount === 0 && sessionData.length > 0 && (
                            <p className="text-gray-500 col-span-full">No pending sessions found.</p>
                        )}
                        {!isLoading && sessionData.length === 0 && (
                             <p className="text-gray-500 col-span-full">No sessions found. Create one to get started!</p>
                        )}
                    </div>
                </div>

                <div>
                    {completedSessionCount > 0 && ( // Changed to > 0 as even one completed session should show the header
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            Completed Sessions
                        </h1>
                    )}
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {isLoading && Array(3).fill(null).map((_, index) => (
                            <SessionCardSkeleton key={`completed-skeleton-${index}`} />
                        ))}
                        {!isLoading &&
                            sessionData
                                .filter(event => event.status === "completed")
                                .map((event) => (
                                    <SessionCard key={event.id} event={event} />
                                ))
                        }
                         {/* If no completed sessions and not loading, display a message */}
                        {!isLoading && completedSessionCount === 0 && sessionData.length > 0 && (
                            <p className="text-gray-500 col-span-full">No completed sessions found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Combined skeleton loading */}
            {isLoading && (
                <div className="grid mt-4 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array(6).fill(null).map((_, index) => (
                        <SessionCardSkeleton key={`all-skeleton-${index}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SessionManagement;
