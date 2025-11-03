import { create } from "zustand";
import axiosInstance from "../../utils/axiosInstance";

const usePostStore = create((set, get) => ({
  posts: [],
  status: {
    uploading: {
      error: null,
      loading: false,
    },
    fetching: {
      error: null,
      loading: false,
    },
  },

  uploadPost: async (payload) => {
    try {
      set((state) => ({
        ...state,
        status: {
          ...state.status,
          uploading: {
            error: null,
            loading: true,
          },
        },
      }));

      const res = await axiosInstance.post(
        "/study-space/posts/create",
        payload
      );
      const newPost = res.data?.data;

      if (newPost) {
        set((state) => ({
          ...state,
          posts: [...state.posts, newPost],
        }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        status: {
          ...state.status,
          uploading: {
            error: error.response?.data || "INTERNAL_SERVER_ERROR",
            loading: false,
          },
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        status: {
          ...state.status,
          uploading: {
            ...state.status.uploading,
            loading: false,
          },
        },
      }));
    }
  },

  fetchPosts: async (spaceId) => {
    try {
      set((state) => ({
        ...state,
        status: {
          ...state.status,
          fetching: {
            error: null,
            loading: true,
          },
        },
      }));

      const res = await axiosInstance.get(
        `/study-space/posts/fetchAll/${spaceId}`
      );
      const fetchedPosts = res.data?.data;

      console.log("Fetched posts:", fetchedPosts);
      console.log("Is array:", Array.isArray(fetchedPosts));

      if (Array.isArray(fetchedPosts)) {
        set((state) => ({
          ...state,
          posts: fetchedPosts, // Direct replace to avoid duplicates
        }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        status: {
          ...state.status,
          fetching: {
            error: error.response?.data || "INTERNAL_SERVER_ERROR",
            loading: false,
          },
        },
      }));
    } finally {
      set((state) => ({
        ...state,
        status: {
          ...state.status,
          fetching: {
            ...state.status.fetching,
            loading: false,
          },
        },
      }));
    }
  },
  addCommentsToPost: async (postId, payload) => {
    try {
      const response = await axiosInstance.post(
        `/study-space/posts/comment/${postId}`,
        payload
      );
      const newComment = response.data.data;

      console.log("New Comment:", newComment);

      set((state) => ({
        ...state,
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                Comments: [...(post.Comments || []), newComment], // ✅ Correct way
              }
            : post
        ),
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },
addLikeToPost: async (postId, userId) => {
  try {
    const res = await axiosInstance.post(`/study-space/posts/addLike/${postId}`);
    const toggledUserId = res.data.data;

    const currentPosts = get().posts;

    const updatedPosts = currentPosts.map((post) => {
      if (post.id === postId) {
        const hasLiked = post.likes?.includes(toggledUserId);

        const newLikes = hasLiked
          ? post.likes.filter((id) => id !== toggledUserId)
          : [...(post.likes || []), toggledUserId];

        return {
          ...post,
          likes: newLikes,
        };
      }
      return post;
    });

    // Find updated post
    const updatedPost = updatedPosts.find((post) => post.id === postId);

    set((state) => ({
      ...state,
      posts: updatedPosts,
    }));

    return {
      likeCount: updatedPost.likes.length,
      isLiked: updatedPost.likes.includes(userId),
    };
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
},




}));

export default usePostStore;
