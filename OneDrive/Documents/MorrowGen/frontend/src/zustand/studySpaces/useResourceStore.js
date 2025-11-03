import { create } from 'zustand';

const useResourceStore = create((set, get) => ({
  // State
  resources: [],
  studySpaceResources: {},
  currentResource: null,
  loading: false,
  error: null,
  uploadProgress: 0,
  stats: null,

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  clearError: () => set({ error: null }),

  // Create/Upload Resource
  uploadResource: async (formData) => {
    set({ loading: true, error: null, uploadProgress: 0 });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/studyspace/resources', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload resource');
      }

      const result = await response.json();
      const newResource = result.data;

      // Update resources list
      set((state) => ({
        resources: [newResource, ...state.resources],
        loading: false,
        uploadProgress: 100
      }));

      // Update study space specific resources if they exist
      const studySpaceId = newResource.studySpaceId;
      if (studySpaceId) {
        set((state) => ({
          studySpaceResources: {
            ...state.studySpaceResources,
            [studySpaceId]: [
              newResource,
              ...(state.studySpaceResources[studySpaceId] || [])
            ]
          }
        }));
      }

      // Reset upload progress after a delay
      setTimeout(() => set({ uploadProgress: 0 }), 1000);

      return newResource;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message,
        uploadProgress: 0 
      });
      throw error;
    }
  },

  // Get all resources
  getAllResources: async (filters = {}) => {
    set({ loading: true, error: null });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const queryParams = new URLSearchParams(filters).toString();
      const url = `/api/studyspace/resources${queryParams ? `?${queryParams}` : ''}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }

      const result = await response.json();
      set({ 
        resources: result.data || [],
        loading: false 
      });

      return result.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Get resources by study space
  getResourcesByStudySpace: async (studySpaceId) => {
    set({ loading: true, error: null });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/studyspace/resources/studyspace/${studySpaceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch study space resources');
      }

      const result = await response.json();
      const resources = result.data || [];

      set((state) => ({
        studySpaceResources: {
          ...state.studySpaceResources,
          [studySpaceId]: resources
        },
        loading: false
      }));

      return resources;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Get single resource
  getResource: async (resourceId) => {
    set({ loading: true, error: null });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/studyspace/resources/${resourceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resource');
      }

      const result = await response.json();
      set({ 
        currentResource: result.data,
        loading: false 
      });

      return result.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Update resource
  updateResource: async (resourceId, formData) => {
    set({ loading: true, error: null });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/studyspace/resources/${resourceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update resource');
      }

      const result = await response.json();
      const updatedResource = result.data;

      // Update in resources list
      set((state) => ({
        resources: state.resources.map(resource =>
          resource.id === resourceId ? updatedResource : resource
        ),
        currentResource: state.currentResource?.id === resourceId ? updatedResource : state.currentResource,
        loading: false
      }));

      // Update in study space resources
      const studySpaceId = updatedResource.studySpaceId;
      if (studySpaceId) {
        set((state) => ({
          studySpaceResources: {
            ...state.studySpaceResources,
            [studySpaceId]: (state.studySpaceResources[studySpaceId] || []).map(resource =>
              resource.id === resourceId ? updatedResource : resource
            )
          }
        }));
      }

      return updatedResource;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Delete resource
  deleteResource: async (resourceId) => {
    set({ loading: true, error: null });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/studyspace/resources/${resourceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }

      // Remove from all lists
      set((state) => ({
        resources: state.resources.filter(resource => resource.id !== resourceId),
        currentResource: state.currentResource?.id === resourceId ? null : state.currentResource,
        loading: false
      }));

      // Remove from study space resources
      set((state) => ({
        studySpaceResources: Object.keys(state.studySpaceResources).reduce((acc, studySpaceId) => {
          acc[studySpaceId] = state.studySpaceResources[studySpaceId].filter(
            resource => resource.id !== resourceId
          );
          return acc;
        }, {})
      }));

      return true;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Toggle archive status
  toggleArchiveResource: async (resourceId) => {
    set({ loading: true, error: null });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/studyspace/resources/${resourceId}/archive`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle archive status');
      }

      const result = await response.json();
      const updatedResource = result.data;

      // Update in all lists
      set((state) => ({
        resources: state.resources.map(resource =>
          resource.id === resourceId ? updatedResource : resource
        ),
        currentResource: state.currentResource?.id === resourceId ? updatedResource : state.currentResource,
        loading: false
      }));

      // Update in study space resources
      const studySpaceId = updatedResource.studySpaceId;
      if (studySpaceId) {
        set((state) => ({
          studySpaceResources: {
            ...state.studySpaceResources,
            [studySpaceId]: (state.studySpaceResources[studySpaceId] || []).map(resource =>
              resource.id === resourceId ? updatedResource : resource
            )
          }
        }));
      }

      return updatedResource;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Download resource
  downloadResource: async (resourceId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/studyspace/resources/${resourceId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download resource');
      }

      // Get filename from response headers if available
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'download';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return true;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // Get resource statistics
  getResourceStats: async () => {
    set({ loading: true, error: null });
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/studyspace/resources/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resource statistics');
      }

      const result = await response.json();
      set({ 
        stats: result.data,
        loading: false 
      });

      return result.data;
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Clear current resource
  clearCurrentResource: () => set({ currentResource: null }),

  // Clear study space resources
  clearStudySpaceResources: (studySpaceId) => {
    set((state) => {
      const newStudySpaceResources = { ...state.studySpaceResources };
      delete newStudySpaceResources[studySpaceId];
      return { studySpaceResources: newStudySpaceResources };
    });
  },
}));

export default useResourceStore;