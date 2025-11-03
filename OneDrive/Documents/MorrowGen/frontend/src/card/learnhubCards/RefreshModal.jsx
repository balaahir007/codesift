import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const RefreshModal = ({ onClose, onConfirm, message }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
    <div className="bg-white rounded-xl shadow-xl max-w-sm w-full transform transition-all duration-200 scale-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full">
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Confirm</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-600 text-sm">
          {message}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 p-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <button 
          onClick={onClose} 
          className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
        >
          Cancel
        </button>
        <button 
          onClick={onConfirm} 
          className="px-4 py-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-sm"
        >
          Yes, Leave
        </button>
      </div>
    </div>
  </div>
);

export default RefreshModal;