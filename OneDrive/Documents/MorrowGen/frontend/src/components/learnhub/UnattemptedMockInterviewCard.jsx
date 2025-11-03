import React from 'react'
import { mockInterviewData } from '..//../assets/learnhub/learnhubAssets'
import { MdDateRange } from 'react-icons/md'
import { IoIosBookmarks } from 'react-icons/io'

const UnattemptedMockInterviewCard = () => {
    return (
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-3 max-w-6xl">
            {mockInterviewData?.length > 0 &&
                mockInterviewData.map((interview, index) => (
                    <div
                        key={index}
                        className="relative border border-gray-200 rounded-xl bg-gradient-to-br from-[#fafdfe] via-[#e8f4f5] to-[#def1f4] p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                    >
                        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-bl-lg shadow-sm">
                            {interview.category}
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                            <img
                                src={interview.mainImage}
                                alt={interview.title}
                                className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">{interview.title}</h3>
                                <div className="flex items-center text-gray-500 text-sm gap-1 mt-1">
                                    <MdDateRange className="text-base" />
                                    <span>{interview.attemptedDate}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                            {interview.description}
                        </p>

                        <div className="flex items-center justify-between text-gray-700 text-sm font-medium mb-3">
                            <div className="flex items-center gap-1">
                                <IoIosBookmarks className="text-xl text-[#1f7370]" />
                                {interview.score > 0 ? interview.score : '---'}<span className='ml-1 text-xs text-gray-500'>/100</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                {interview.thumbnailImages?.map((thumbnail, index) => (
                                    <img
                                        key={index}
                                        src={thumbnail}
                                        alt={`thumb-${index}`}
                                        className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover shadow-sm"
                                    />
                                ))}
                            </div>

                            <button className="px-4 py-1.5 cursor-pointer text-sm font-medium text-white bg-[#2ab3af] border border-[#b2dfe6] rounded-md hover:bg-white hover:text-[#2ab3af] hover:border-[#2ab3af] transition-all duration-200 shadow-sm">
                                Take Interview
                            </button>

                        </div>
                    </div>
                ))}
        </div>
    )
}

export default UnattemptedMockInterviewCard
