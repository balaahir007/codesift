import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import PostCard from './PostCard';

const StudySpacePost = () => {
  const { postId, spaceId } = useParams();

  const [post, setPost] = useState(null); // null instead of {}

  const fetchPost = async (postId, spaceId) => {
    try {
      const res = await axiosInstance.get(`/study-space/posts/fetch/${spaceId}/post/${postId}`);
      if (res?.data?.data) {
        setPost(res?.data?.data);
      }
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    if (spaceId && postId) {
      fetchPost(postId, spaceId);
    }
  }, [spaceId, postId]);

  return (
    <div>
        {
        post?.length > 0 ? post?.map((item)=>(
            <PostCard post={item} />
        )) : (
            <span>Post is Not found</span>
        )
      }
    </div>
  );
};

export default StudySpacePost;
