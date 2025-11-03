import React from "react";

const LiveSessions = ({ sessions }) => {
  if (!sessions.length)
    return (
      null
    );

  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Live Sessions
      </h2>

      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex flex-col md:flex-row bg-white border rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="relative md:w-1/3 h-52 md:h-auto">
            <img
              src={session.sessionImage}
              alt={session.sessionTitle}
              className="w-full h-full object-cover rounded-t-md md:rounded-none md:rounded-l-lg"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-md">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping relative"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-red-600 absolute"></span>
              <span className="text-xs font-bold text-red-700">LIVE</span>
            </div>

          </div>

          {/* Session content */}
          <div className="p-5 md:w-2/3 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {session.sessionHeading}
            </h3>
            <p className="text-gray-600">{session.sessionTitle}</p>
            <p className="text-sm text-gray-500">{session.sessionDescription}</p>
            <p className="text-sm text-gray-500">
              Date: {session.sessionDate} | Time: {session.sessionTime}
            </p>
            <button
              onClick={() => alert("Joining session...")}
              className="mt-4 px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            >
              Join Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveSessions;
