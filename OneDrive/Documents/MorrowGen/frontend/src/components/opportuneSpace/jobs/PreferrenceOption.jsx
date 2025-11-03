import React from 'react';
import { IoMdClose } from 'react-icons/io';

const PreferrenceOption = ({ id, onClose, isOpen = false }) => {
    return (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-whit0 bg-opacity-30 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                    }`}
                onClick={onClose}
            ></div>

            {/* Drawer */}
            <div
                className={`h-screen w-full max-w-md flex  flex-col bg-white  border-primary p-6 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } pointer-events-auto`}
            >
                {/* Header */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-primary">Manage your Job Preferences</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-primary text-2xl focus:outline-none"
                        >
                            <IoMdClose />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-6">
                        {/* Job Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
                            <input
                                type="text"
                                placeholder="e.g. Software Engineer"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                            <div className="flex gap-2">
                                <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="INR">&#8377;</option>
                                    <option value="USD">&#36;</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="e.g. 50000"
                                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                placeholder="e.g. Bangalore, India"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-auto pt-6 flex gap-4">
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            {/* Action Buttons at Bottom */}

        </div>
    );
};

export default PreferrenceOption;
