import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePostStore from "../../../zustand/studySpaces/usePostStore";
import PostCard from "../../../components/learnhub/study-space/PostCard";
import PostCardSkeleton from "../../../components/learnhub/study-space/PostCardSkeleton";

const StudySpacePosts = () => {
  const { spaceId } = useParams();
  const { fetchPosts, posts } = usePostStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      setIsLoading(true);
      try {
        await fetchPosts(spaceId);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPosts();
  }, [spaceId, fetchPosts]);

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading ? (
        <div className="w-full max-w-lg mx-auto space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <PostCardSkeleton />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found.</p>
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}

    </div>
  );
};

export default StudySpacePosts;
