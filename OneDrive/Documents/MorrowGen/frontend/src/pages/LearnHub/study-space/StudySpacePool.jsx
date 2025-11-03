import { Users } from "lucide-react";
import { useState } from "react";
import ManagePool from "./../../../components/learnhub/study-space/ManagePool";
import { CreatePool } from "./../../../components/learnhub/study-space/CreatePool";

export const StudySpacePool = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [pools, setPools] = useState([]);

  const handlePoolCreated = (newPool) => {
    setPools((prevPools) => [newPool, ...prevPools]);
    setShowCreateForm(false); // close modal after creating
  };

  const handleDeletePool = (poolId) => {
    setPools((prevPools) => prevPools.filter((pool) => pool.id !== poolId));
  };

  const handleUpdatePool = (poolId, updates) => {
    setPools((prevPools) =>
      prevPools.map((pool) =>
        pool.id === poolId ? { ...pool, ...updates } : pool
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2F5] via-white to-[#B3E0E9] p">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent mb-2">
              Study Pool Manager
            </h1>
            <p className="text-gray-600">Create and manage interactive study sessions</p>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              + Upload
            </button>
          </div>

          {/* Pools UI */}
          <ManagePool
            pools={pools}
            onDeletePool={handleDeletePool}
            onUpdatePool={handleUpdatePool}
            onCreateNew={() => setShowCreateForm(true)}
          />
        </div>
      </div>

      {/* Modal Popup */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* CreatePool Component */}
            <CreatePool
              onPoolCreated={handlePoolCreated}
              onClose={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
