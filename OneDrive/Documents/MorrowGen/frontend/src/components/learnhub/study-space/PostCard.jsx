import React, { useState } from 'react';
import {
    Heart,
    MessageCircle,
    Share2,
    Send,
    MoreHorizontal,
    ThumbsUp,
    ChevronLeft,
    ChevronRight,
    Moon,
    Sun,
    CheckCircle,
} from 'lucide-react';
import { BiSend } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';

import PostCardContent from './PostCardContent';
import usePostStore from '../../../zustand/studySpaces/usePostStore';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import useThemeStore from '../../../zustand/themeStore';

const formatTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMs = now - posted;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;
    return posted.toLocaleDateString();
};

const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const { spaceId } = useParams();
    const { addCommentsToPost, addLikeToPost } = usePostStore();
    const { authUser } = useAuthStore();

    const {mode} = useThemeStore()
    const [isLiked, setIsLiked] = useState(post?.likes?.includes(authUser?.id));
    const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openSharePanel, setOpenSharePanel] = useState(null);
    const [linkCopied, setLinkCopied] = useState(false);

    const attachments = post?.attachments || [];
    const comments = post?.Comments || [];

    // Theme colors
    const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const borderLight = mode === 'dark' ? 'border-[#1B2E31]' : 'border-gray-100';
    const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-100';
    const inputBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
    const buttonBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
    const hoverButtonBg = mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-100';
    const likedBg = mode === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50';
    const likedHoverBg = mode === 'dark' ? 'hover:bg-blue-900/50' : 'hover:bg-blue-100';

    const handleLike = async (postId) => {
        try {
            const { likeCount, isLiked } = await addLikeToPost(postId, authUser?.id);
            setIsLiked(isLiked);
            setLikeCount(likeCount);
        } catch (error) {
            console.error('Failed to like post', error);
        }
    };

    const handleAddComment = async (postId) => {
        if (!commentInput.trim()) return;
        try {
            await addCommentsToPost(postId, { comment: commentInput });
            setCommentInput('');
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    };

    const handlePrev = () => {
        if (attachments.length > 0) {
            setCurrentIndex((prev) => (prev === 0 ? attachments.length - 1 : prev - 1));
        }
    };

    const handleNext = () => {
        if (attachments.length > 0) {
            setCurrentIndex((prev) => (prev === attachments.length - 1 ? 0 : prev + 1));
        }
    };

    const toggleSharePanel = (postId) => {
        setOpenSharePanel((prev) => (prev === postId ? null : postId));
    };

    const handleSendMenuClick = (sendMenuName, postId) => {
        if (sendMenuName == 'copyLink') {
            setLinkCopied(true);
            navigator.clipboard.writeText(`http://localhost:5173/study-space/388b78da-270f-4ed1-a46a-3803f61e6c9a/post/${postId}`);
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    const sendMenus = [
        {
            id: 'copyLink',
            name: "Copy Link",
            icon: FaLink
        }
    ];

    return (
        <div className={`${bgCard} rounded-lg shadow-sm border ${borderColor} mb-4 hover:shadow-md transition-all duration-200 w-full max-w-lg mx-auto relative`}>
        

            {/* Header */}
            <div className="p-3 sm:p-4 pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 mr-2">
                        <img
                            src={post?.author?.profilePicture}
                            alt={post?.author?.username}
                            onClick={() => navigate(`/study-space/${spaceId}/user/${post?.author?.id}`)}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover cursor-pointer flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold ${textPrimary} text-xs sm:text-sm hover:text-blue-600 cursor-pointer truncate`}>
                                {post?.author?.username?.charAt(0).toUpperCase() + post?.author?.username?.slice(1)}
                            </h3>
                            <p className={`text-xs ${textSecondary} leading-tight truncate`}>{post?.author?.title}</p>
                            <p className={`text-xs ${textTertiary} mt-0.5 sm:mt-1`}>{formatTimeAgo(post?.createdAt)} • 🌐</p>
                        </div>
                    </div>
                    <button className={`${textSecondary} hover:${textPrimary} p-1 flex-shrink-0 ml-2`}>
                        <MoreHorizontal size={18} className="sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            <div className="px-3 sm:px-4 pb-3">
                <PostCardContent content={post?.content || ''} />
            </div>

            {attachments.length > 0 && (
                <div className="px-3 sm:px-4 pb-3">
                    <div className={`relative rounded-lg overflow-hidden ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50'}`}>
                        {attachments.length > 1 && (
                            <button 
                                onClick={handlePrev} 
                                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 shadow-lg"
                            >
                                <ChevronLeft size={14} className="sm:w-4 sm:h-4 text-gray-700" />
                            </button>
                        )}
                        <img 
                            src={attachments[currentIndex]} 
                            alt={`attachment ${currentIndex + 1}`} 
                            className="w-full h-48 sm:h-64 object-cover" 
                        />
                        {attachments.length > 1 && (
                            <>
                                <button 
                                    onClick={handleNext} 
                                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 shadow-lg"
                                >
                                    <ChevronRight size={14} className="sm:w-4 sm:h-4 text-gray-700" />
                                </button>
                                <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                                    {attachments.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-60'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {(likeCount > 0 || comments.length > 0) && (
                <div className={`px-3 sm:px-4 py-2 border-b ${borderLight} text-xs ${textSecondary} flex justify-between items-center`}>
                    <div className="flex items-center space-x-1">
                        {likeCount > 0 && (
                            <div className="flex items-center space-x-1">
                                <div className="flex -space-x-1">
                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                        <ThumbsUp size={7} className="sm:w-2 sm:h-2 text-white" />
                                    </div>
                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <Heart size={7} className="sm:w-2 sm:h-2 text-white fill-current" />
                                    </div>
                                </div>
                                <span className="ml-1">{likeCount}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-3 sm:space-x-4">
                        {comments.length > 0 && <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>}
                        {post?.shares?.length > 0 && <span>{post.shares.length} repost{post.shares.length !== 1 ? 's' : ''}</span>}
                    </div>
                </div>
            )}

            <div className="px-2 sm:px-4 py-2 sm:py-3">
                <div className="flex items-center justify-around gap-1">
                    <button
                        onClick={() => handleLike(post?.id)}
                        className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium transition-colors ${
                            isLiked 
                                ? `text-primary ${likedBg} ${likedHoverBg}` 
                                : `${textSecondary} ${hoverBg}`
                        }`}
                    >
                        <ThumbsUp size={12} className="sm:w-3.5 sm:h-3.5" style={{ fill: isLiked ? 'currentColor' : 'none' }} />
                        <span className="hidden sm:inline">Like</span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium ${textSecondary} ${hoverBg}`}
                    >
                        <MessageCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">Comment</span>
                    </button>

                    <div className='relative'>
                        <button
                            onClick={() => toggleSharePanel(post?.id)}
                            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium ${textSecondary} ${hoverBg}`}
                        >
                            <Send size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">Send</span>
                        </button>

                        {openSharePanel === post.id && (
                            <div className={`absolute left-0 bottom-full mb-2 ${bgCard} shadow-lg rounded-md p-2 z-10 border ${borderColor} min-w-[140px]`}>
                                {sendMenus.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className={`flex text-nowrap text-xs sm:text-sm items-center gap-2 p-2 cursor-pointer ${hoverBg} rounded ${textPrimary}`}
                                        onClick={() => handleSendMenuClick(item.id, post.id)}
                                    >
                                        <p>{item.name}</p>
                                        {linkCopied && item.id === "copyLink" ? 
                                            <CheckCircle size={14} className="sm:w-4 sm:h-4 text-primary" /> : 
                                            <item.icon size={14} className="sm:w-4 sm:h-4" />
                                        }
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showComments && (
                <div className={`${bgCard} rounded-lg shadow-sm border ${borderColor} overflow-hidden`}>
                    {/* Comment Input */}
                    <div className={`p-3 sm:p-4 border-b ${borderLight}`}>
                        <div className="flex items-start space-x-2 sm:space-x-3">
                            <img
                                src={post?.author?.profilePicture}
                                alt="User avatar"
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex w-full flex-col relative">
                                <input
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    type="text"
                                    placeholder="Add a comment..."
                                    className={`w-full ${inputBg} border ${borderColor} rounded-full px-3 sm:px-4 py-2 pr-10 text-xs sm:text-sm ${textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <button
                                    onClick={() => handleAddComment(post?.id)}
                                    className="text-blue-500 absolute text-lg sm:text-xl cursor-pointer right-2 sm:right-3 top-1/2 transform -translate-y-1/2 hover:text-blue-600 transition-colors"
                                >
                                    <BiSend />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="max-h-60 sm:h-40 overflow-y-scroll">
                        {comments.map((cmt) => (
                            <div key={cmt.id} className={`p-3 sm:p-4 border-b ${borderLight} last:border-b-0 ${hoverBg} transition-colors`}>
                                {cmt?.commenter && (
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                        <img
                                            src={cmt?.commenter?.profilePicture}
                                            alt="Profile"
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ${mode === 'dark' ? 'ring-[#294B4E]' : 'ring-gray-200'}`}
                                        />
                                        <span className={`font-medium ${textPrimary} text-xs sm:text-sm`}>
                                            {cmt?.commenter?.username}
                                        </span>
                                    </div>
                                )}
                                <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed ml-9 sm:ml-11`}>
                                    {cmt?.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;