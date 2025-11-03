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
} from 'lucide-react';
import { BiSend } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // or use any other you prefer

import PostCardContent from './PostCardContent';
import usePostStore from '../../../zustand/studySpaces/usePostStore';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import { FaLink } from 'react-icons/fa';

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


    const [isLiked, setIsLiked] = useState(post?.likes?.includes(authUser?.id));
    const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const attachments = post?.attachments || [];
    const comments = post?.Comments || [];



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

    const [openSharePanel, setOpenSharePanel] = useState(null);
    const toggleSharePanel = (postId) => {
        setOpenSharePanel((prev) => (prev === postId ? null : postId));
    };

    const [linkCopied, setLinkCopied] = useState(false);
    const handleSendMenuClick = (sendMenuName,postId) => {
        if (sendMenuName == 'copyLink') {
            setLinkCopied(true)
            navigator.clipboard.writeText(`http://localhost:5173/study-space/388b78da-270f-4ed1-a46a-3803f61e6c9a/post/${postId}`)
        }
  
    }

    const sendMenus = [
        {
            id: 'copyLink',
            name: "Copy Link",
            icon: FaLink
        }
    ]

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 hover:shadow-md transition-shadow duration-200 w-full max-w-lg mx-auto">
            {/* Header */}
            <div className="p-4 pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                        <img
                            src={post?.author?.profilePicture}
                            alt={post?.author?.username}
                            onClick={() => navigate(`/study-space/${spaceId}/user/${post?.author?.id}`)}
                            className="w-12 h-12 rounded-full object-cover cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm hover:text-blue-600 cursor-pointer truncate">
                                {post?.author?.username?.charAt(0).toUpperCase() + post?.author?.username?.slice(1)}
                            </h3>
                            <p className="text-xs text-gray-600 leading-tight truncate">{post?.author?.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(post?.createdAt)} • 🌐</p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0 ml-2">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            <div className="px-4 pb-3">
                <PostCardContent content={post?.content || ''} />
            </div>

            {attachments.length > 0 && (
                <div className="px-4 pb-3">
                    <div className="relative rounded-lg overflow-hidden bg-gray-50">
                        {attachments.length > 1 && (
                            <button onClick={handlePrev} className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg">
                                <ChevronLeft size={16} className="text-gray-700" />
                            </button>
                        )}
                        <img src={attachments[currentIndex]} alt={`attachment ${currentIndex + 1}`} className="w-full h-64 object-cover" />
                        {attachments.length > 1 && (
                            <>
                                <button onClick={handleNext} className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg">
                                    <ChevronRight size={16} className="text-gray-700" />
                                </button>
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {attachments.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-60'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {(likeCount > 0 || comments.length > 0) && (
                <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-600 flex justify-between">
                    <div className="flex items-center space-x-1">
                        {likeCount > 0 && (
                            <div className="flex items-center space-x-1">
                                <div className="flex -space-x-1">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                        <ThumbsUp size={8} className="text-white" />
                                    </div>
                                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <Heart size={8} className="text-white fill-current" />
                                    </div>
                                </div>
                                <span className="ml-1">{likeCount}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-4">
                        {comments.length > 0 && <span>{comments.length} comments</span>}
                        {post?.shares?.length > 0 && <span>{post.shares.length} reposts</span>}
                    </div>
                </div>
            )}

            <div className="px-4 py-3">
                <div className="flex items-center justify-around">
                    <button
                        onClick={() => handleLike(post?.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-medium transition-colors ${isLiked ? 'text-primary bg-blue-50 hover:bg-blue-100' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ThumbsUp size={14} className={isLiked ? 'fill-current' : ''} />
                        <span>Like</span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100"
                    >
                        <MessageCircle size={14} />
                        <span>Comment</span>
                    </button>

                    {/* <button className="flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100">
                        <Share2 size={14} />
                        <span>Repost</span>
                    </button> */}

                    <div className='relative'>
                        <button
                            onClick={() => toggleSharePanel(post?.id)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100"
                        >
                            <Send size={14} />
                            <span>Send</span>
                        </button>

                        {openSharePanel === post.id && (
                            <div className="absolute left-0 bg-white shadow-lg rounded-md p-2 mx-4 mb-3 z-10">
                                {sendMenus.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="flex text-nowrap text-sm items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSendMenuClick(item.id,post.id)}
                                    >
                                        <p>{item.name}</p>
                                        {linkCopied && item.id === "copyLink" ? <CheckCircle size={16} className="text-primary" /> : <item.icon size={16} />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {showComments && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    {/* Comment Input */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-start space-x-3">
                            <img
                                src={post?.author?.profilePicture}
                                alt="User avatar"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex w-full flex-col relative">
                                <input
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => handleAddComment(post?.id)}
                                    className="text-blue-500 absolute text-xl cursor-pointer right-3 top-1/2 transform -translate-y-1/2 hover:text-blue-600 transition-colors"
                                >
                                    <BiSend />
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="h-40 overflow-y-scroll">
                        {comments.map((cmt) => (
                            <div key={cmt.id} className="p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
                                {cmt?.commenter && (
                                    <div className="flex items-center gap-3 mb-2">
                                        <img
                                            src={cmt?.commenter?.profilePicture}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
                                        />
                                        <span className="font-medium text-gray-900 text-sm">{cmt?.commenter?.username}</span>
                                    </div>
                                )}
                                <p className="text-sm text-gray-700 leading-relaxed ml-11">{cmt?.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
