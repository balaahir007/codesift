import React, { useState } from 'react';

const PostCardContent = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => setIsExpanded((prev) => !prev);

  const shouldTruncate = content?.length > 100;

  const displayText = isExpanded ? content : content?.slice(0, 100);

  return (
    <div className="px-4 pb-3">
      <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap break-words">
        {displayText}
        {shouldTruncate && !isExpanded && '...'}
      </p>

      {shouldTruncate && (
        <button
          onClick={toggleContent}
          className="text-blue-600 text-sm font-medium mt-1"
        >
          {isExpanded ? 'less' : 'more'}
        </button>
      )}
    </div>
  );
};

export default PostCardContent;
