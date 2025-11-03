import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

const InviteLinkInput = ({ inviteCode }) => {
  const [inviteLink, setInviteLink] = useState(inviteCode || '');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`http://localhost:5173/study-space/join/${inviteLink}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Copy failed:', err);
      });
  };

  return (
    <div className="flex items-center gap-2 p-4 w-full max-w-xl bg-white rounded-xl shadow-sm border border-gray-200">
      <input
        ref={inputRef}
        type="text"
        value={inviteLink}
        readOnly
        className="flex-1 px-3 py-2 rounded-md bg-gray-50 border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      />
      <button
        onClick={handleCopy}
        className="relative group p-2 rounded-md hover:bg-blue-100 transition-colors"
        title="Copy Link"
      >
        {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} className="text-blue-600" />}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>
    </div>
  );
};

export default InviteLinkInput;
