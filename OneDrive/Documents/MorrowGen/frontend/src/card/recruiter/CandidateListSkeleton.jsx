import React from 'react';

export default function CandidateListSkeleton({ mode = 'light', jobsCount = 2, candidatesPerJob = 3 }) {
  const skeletonItems = Array(jobsCount)
    .fill(null)
    .map((_, jobIdx) => (
      <div key={jobIdx} className="mb-12">
        {/* Job Header Skeleton */}
        <div className={`mb-6 p-6 rounded-2xl border ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
          <div className={`h-8 rounded-lg mb-4 ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`} style={{ width: '40%' }} />
          <div className="space-y-2">
            <div className={`h-4 rounded-lg ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`} style={{ width: '60%' }} />
            <div className={`h-4 rounded-lg ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`} style={{ width: '50%' }} />
          </div>
        </div>

        {/* Candidates Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(candidatesPerJob)
            .fill(null)
            .map((_, cardIdx) => (
              <div
                key={cardIdx}
                className={`rounded-2xl border overflow-hidden ${mode === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
              >
                {/* Card Header Skeleton */}
                <div className={`p-4 ${mode === 'dark' ? 'bg-slate-800' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Name and Status */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <div
                          className={`h-5 rounded-lg flex-1 ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}
                          style={{ minWidth: '120px' }}
                        />
                        <div
                          className={`h-5 rounded-full ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}
                          style={{ width: '60px' }}
                        />
                      </div>
                      {/* Position */}
                      <div
                        className={`h-4 rounded-lg mb-2 ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}
                        style={{ width: '80%' }}
                      />
                      {/* Date */}
                      <div
                        className={`h-3 rounded-lg ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}
                        style={{ width: '60%' }}
                      />
                    </div>
                    {/* Chevron */}
                    <div
                      className={`h-5 w-5 rounded-lg flex-shrink-0 ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}
                    />
                  </div>
                </div>

                {/* Quick Info Skeleton */}
                <div className={`px-4 py-3 border-t space-y-2 ${mode === 'dark' ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-gray-50'}`}>
                  <div
                    className={`h-4 rounded-lg ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}
                    style={{ width: '70%' }}
                  />
                  <div
                    className={`h-4 rounded-lg ${mode === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    ));

  return <div className="max-w-6xl mx-auto px-4 py-8">{skeletonItems}</div>;
}