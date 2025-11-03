import React, { useState } from 'react';
import NoteForm from './NoteForm';

const EmptyState = ({ title, message }) => (
    <div className="flex flex-col items-center justify-center py-12">
        <svg
            className="h-16 w-16 text-teal-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
        </svg>
        <p className="text-gray-500 text-center">{message}</p>
    </div>
);

const StudySpaceNotes = () => {
    const notes = [{
        title: "Create a website",
        description: 'to enhance thinking ability..',
        bgTheme: '',
        bgImg: '',
        images: [],
        labels: [],
        drawing: [],
        visibility: 'public',
    }];

    const [openNoteBox, setOpenNoteBox] = useState(false)

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Create and organize your personal study notes here. You can keep them private or choose to share them publicly so others in the study space can benefit and collaborate with you.
                    </p>
                    <button onClick={() => setOpenNoteBox(true)} className="bg-primary hover:bg-secondary text-white text-sm px-6 py-2 rounded-lg font-medium transition-colors">
                        + New Note
                    </button>
                </div>
            </div>
            {
                openNoteBox && (
                    <div className='fixed bg-black/10 w-full h-full inset-0 z-40 flex items-center justify-center'>
                        <NoteForm />
                    </div>
                )
            }

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">My Notes</h2>
                    {notes.length === 0 ? (
                        <EmptyState message="No notes yet. Start by creating one!" />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {notes.map((note, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 shadow-md  hover:shadow-md transition-shadow">
                                    <h3 className="font-semibold text-gray-900 mb-2">{note.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{note.description.split(0, 100)}</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs px-2 py-1 rounded-full ${note.visibility === 'public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {note.visibility}
                                        </span>
                                        <div className="flex gap-2">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                                            <button className="text-gray-500 hover:text-gray-700 text-sm">Share</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Explore Notes</h2>
                    <EmptyState message="No public notes available yet." />
                </div>
            </div>
        </div>
    );
};

export default StudySpaceNotes;