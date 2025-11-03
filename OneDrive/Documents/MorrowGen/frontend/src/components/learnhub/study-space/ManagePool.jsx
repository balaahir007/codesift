import { useState } from "react";
import { Plus, BarChart3, Users, Settings } from "lucide-react";

const ManagePool = ({ pools = [], onDeletePool, onUpdatePool }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPool, setSelectedPool] = useState(null);
  const [copied, setCopied] = useState(false);

  const filteredPools = pools.filter(pool => {
    const matchesSearch = pool.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pool.roomCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || pool.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const copyRoomCode = async (roomCode) => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(roomCode);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDeletePool = (poolId) => {
    if (window.confirm("Are you sure you want to delete this pool? This action cannot be undone.")) {
      if (onDeletePool) {
        onDeletePool(poolId);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateResponsePercentage = (responses, optionIndex) => {
    const total = responses.reduce((sum, r) => sum + r.count, 0);
    const optionCount = responses.find(r => r.option === optionIndex)?.count || 0;
    return total > 0 ? Math.round((optionCount / total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search pools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pools</p>
              <p className="text-2xl font-bold text-gray-800">{pools.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Pools</p>
              <p className="text-2xl font-bold text-green-600">{pools.filter(p => p.status === 'active').length}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white/60 rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-purple-600">{pools.reduce((sum, pool) => sum + pool.participants, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Pools List */}
      <div className="space-y-4">
        {filteredPools.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No pools found</h3>
            <p className="text-gray-500">
              {pools.length === 0 ? "Create your first study pool to get started" : "Try adjusting your search criteria"}
            </p>
          </div>
        ) : (
          filteredPools.map((pool) => (
            <div key={pool.id} className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              {/* Pool Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{pool.question}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pool.status)}`}>
                      {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                    </span>
                  </div>
                  {pool.description && (
                    <p className="text-gray-600 mb-2">{pool.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formatDate(pool.createdAt)}</span>
                    <span>{pool.participants} participants</span>
                    <span>{pool.timeLimit === 0 ? "No limit" : `${pool.timeLimit}s`}</span>
                  </div>
                </div>

                {/* Room Code */}
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                    <span className="font-mono font-bold text-indigo-600">{pool.roomCode}</span>
                  </div>
                  <button
                    onClick={() => copyRoomCode(pool.roomCode)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Copy room code"
                  >
                    📋
                  </button>
                  {copied === pool.roomCode && (
                    <span className="text-xs text-green-600 font-medium">Copied!</span>
                  )}
                </div>
              </div>

              {/* Options and Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Options</h4>
                  <div className="space-y-2">
                    {pool.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-700">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Results</h4>
                  <div className="space-y-2">
                    {pool.options.map((option, index) => {
                      const percentage = calculateResponsePercentage(pool.responses, index);
                      const count = pool.responses.find(r => r.option === index)?.count || 0;
                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{String.fromCharCode(65 + index)}) {option}</span>
                            <span className="font-medium">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedPool(selectedPool === pool.id ? null : pool.id)}
                  className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  {selectedPool === pool.id ? 'Hide Details' : 'View Details'}
                </button>

                <button
                  onClick={() => handleDeletePool(pool.id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                >
                  Delete
                </button>
              </div>

              {/* Expanded Details */}
              {selectedPool === pool.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50/50 -mx-6 px-6 py-4 rounded-b-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Settings</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Time Limit: {pool.timeLimit === 0 ? "No limit" : `${pool.timeLimit} seconds`}</p>
                        <p>Multiple Answers: {pool.allowMultiple ? "Yes" : "No"}</p>
                        <p>Created: {formatDate(pool.createdAt)}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Statistics</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Total Participants: {pool.participants}</p>
                        <p>Total Responses: {pool.responses.reduce((sum, r) => sum + r.count, 0)}</p>
                        <p>Response Rate: {pool.participants > 0 ? Math.round((pool.responses.reduce((sum, r) => sum + r.count, 0) / pool.participants) * 100) : 0}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default ManagePool