import React, { useEffect, useState,useRef } from 'react';
import { Pencil, Upload, X, Plus, Trash2, Video, GraduationCap, Loader2 } from 'lucide-react';
import { RiDraggable } from "react-icons/ri";
import uploadFile from './../../../utils/uploadFile.js'
import axiosInstance from '../../../utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import useThemeStore from '../../../zustand/themeStore.js';

const CourseCreatePage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Business' },
    { id: 4, name: 'Marketing' }
  ]);

  const [dataObj, setDataObj] = useState({
    title: '',
    description: '',
    categoryId: '',
    imageUrl: '',
    price: '',
    duration: '',
    level: 'Beginner',
    language: 'English',
    isPublished: false
  });

  const [chapters, setChapters] = useState([
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [chapterForm, setChapterForm] = useState({
    title: '',
    description: '',
    attachMentUrl: '',
    duration: '',
    isPreview: null
  });

  const [editObj, setEditObj] = useState({
    title: false,
    description: false,
    categoryId: false,
    price: false,
    duration: false,
    level: false,
    language: false,
  });

  const [savingObj, setSavingObj] = useState({
    title: false,
    description: false,
    categoryId: false,
    imageUrl: false,
    price: false,
    duration: false,
    level: false,
    language: false
  });

  // Load course data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseRes, categoryRes] = await Promise.all([
          axiosInstance.get(`/course/${id}`),
          axiosInstance.get('/course/categories')
        ]);

        const course = courseRes.data.data;
        const categories = categoryRes.data.data;

        console.log("Fetched course:", course);
        console.log("Fetched categories:", categories);
        if (course) {
          setData(course);
          setDataObj(prev => ({ ...prev, ...course }));

          if (course.attachments && course.attachments.length > 0) {
            setChapters(course.attachments);
            setChapterForm(prev => ({ ...prev, ...course.attachments[0] }));
          }
        }

        if (categories) {
          setCategories(categories);
        }

      } catch (error) {
        console.error(error);
        toast.error("Failed to load course or categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  const requireFields = [
    dataObj.title,
    dataObj.categoryId,
    dataObj.imageUrl,
    dataObj.description,
    dataObj.price
  ];
  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;

  const toggleEdit = (editField) => {
    setEditObj((prev) => ({ ...prev, [editField]: !prev[editField] }));
  };

  const updateField = (fieldName, value) => {
    setDataObj((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateField(name, type === 'checkbox' ? checked : value);
  };

  const submitField = async (fieldName) => {
    setSavingObj((prev) => ({ ...prev, [fieldName]: true }));
    const payload = { [fieldName]: dataObj[fieldName] };

    try {
      const res = await axiosInstance.patch(`/course/${id}`, payload);
      setData(res.data.data);
      setEditObj((prev) => ({ ...prev, [fieldName]: false }));
      toast.success("Saved successfully!");
    } catch (error) {
      console.error("Error saving field:", error);
      toast.error("Something went wrong!");
    } finally {
      setSavingObj((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const cancelEdit = (fieldName) => {
    setDataObj((prev) => ({ ...prev, [fieldName]: data?.[fieldName] || '' }));
    setEditObj((prev) => ({ ...prev, [fieldName]: false }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setSavingObj((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const imageUrl = await uploadFile(file);
      updateField(fieldName, imageUrl);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      const fakeUrl = URL.createObjectURL(file);
      updateField(fieldName, fakeUrl);
      toast.error("Upload failed, using local preview");
    } finally {
      setSavingObj((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the file object in chapterForm for later upload
    const localUrl = URL.createObjectURL(file);
    setChapterForm(prev => ({
      ...prev,
      attachMentUrl: localUrl,
      videoFile: file  // Store the file object
    }));
  };

  const openChapterModal = (chapter = null) => {
    if (chapter) {
      setEditingChapter(chapter);
      setChapterForm({
        title: chapter.title,
        description: chapter.description || '',
        attachMentUrl: chapter.attachMentUrl,
        duration: chapter.duration || '',
        isPreview: chapter.isPreview || null
      });
    } else {
      setEditingChapter(null);
      setChapterForm({
        title: '',
        description: '',
        attachMentUrl: '',
        duration: '',
        isPreview: null
      });
    }
    setIsModalOpen(true);
  };

  const {mode} = useThemeStore()
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textTertiary = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';

  const closeChapterModal = () => {
    setIsModalOpen(false);
    setEditingChapter(null);
    setChapterForm({
      title: '',
      description: '',
      attachMentUrl: '',
      duration: '',
      isPreview: null
    });
  };

  const [isChapterLoading, setIsChapterLoading] = useState(false);

  const saveChapter = async () => {
    setIsChapterLoading(true);
    if (!chapterForm.title || !chapterForm.attachMentUrl) {
      toast.error("Please fill in title and upload a video");
      return;
    }

    const formData = new FormData();
    formData.append('id', editingChapter?.id || ''); // empty if new
    formData.append('title', chapterForm.title);
    formData.append('description', chapterForm.description);
    formData.append('duration', chapterForm.duration);
    formData.append('isPreview', chapterForm.isPreview);

    if (chapterForm.videoFile) {
      formData.append('video', chapterForm.videoFile);
    } else {
      formData.append('videoUrl', chapterForm.attachMentUrl);
    }

    try {
      const res = await axiosInstance.post(`/course/${id}/chapter`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updatedChapter = res.data.data;
      if (updatedChapter) {
          setChapters((prev)=>{
            const existingIndex = prev.findIndex(ch => ch.id === updatedChapter.id);
            if(existingIndex !== -1){
              const newChapters = [...prev];
              newChapters[existingIndex] = updatedChapter;
              return newChapters;
            } else {
              return [...prev, updatedChapter];
            }
          })
      }

      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save chapter");
    } finally {
      setIsChapterLoading(false);
      closeChapterModal();
    }
  };


  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, chapter) => {
    setDraggedItem(chapter);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = async (e, targetChapter) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetChapter.id) return;

    const draggedIndex = chapters.findIndex(ch => ch.id === draggedItem.id);
    const targetIndex = chapters.findIndex(ch => ch.id === targetChapter.id);

    const newChapters = [...chapters];
    newChapters.splice(draggedIndex, 1);
    newChapters.splice(targetIndex, 0, draggedItem);

    const reorderedChapters = newChapters.map((ch, idx) => ({ ...ch, order: idx }));
    setChapters(reorderedChapters);

    const movedChapter = reorderedChapters.find(ch => ch.id === draggedItem.id);


    try {
      await axiosInstance.patch(`/course/${id}/chapter/${movedChapter.id}/reorder`, {
        // index start from 0 so increase the order to + 1
        order: movedChapter.order + 1
      });
    } catch (error) {
      console.error("Error saving chapter order:", error);
      toast.error("Failed to save chapter order");
    }
  };

  const [isDeleteChapterId, setIsDeleteChapterId] = useState(null);

  const deleteChapter = (chapterId) => {
    setIsDeleteChapterId(chapterId);
  };

  const confirmDeleteChapter = async () => {
    try {
      await axiosInstance.delete(`/course/${id}/chapter/${isDeleteChapterId}`);
      setChapters(prevChapters => prevChapters.filter(chapter => chapter.id !== isDeleteChapterId));
      toast.success("Chapter deleted successfully!");
    } catch (error) {
      console.error("Error deleting chapter:", error);
      toast.error("Failed to delete chapter");
    } finally {
      setIsDeleteChapterId(null);
    }
  };

  const saveCourse = async () => {
    if (!dataObj.title) {
      toast.error("Please enter a course title");
      return;
    }
    if (!dataObj.categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (chapters.length === 0) {
      toast.error("Please add at least one chapter");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...dataObj,
      };
      const res = await axiosInstance.patch(`/course/${id}`, payload);
      setData(res.data.data);
      toast.success("Course saved successfully!");
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (e) => {
    const isPublished = e.target.checked;

    if (isPublished && completedFields < totalFields) {
      toast.error("Please complete all required fields before publishing");
      return;
    }

    if (isPublished && chapters.length === 0) {
      toast.error("Please add at least one chapter before publishing");
      return;
    }
    setDataObj((prev) => ({ ...prev, isPublished }));
  };

const EditableField = ({ label, name, value, type = "text", placeholder, textarea = false }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">{label}</h3>
        <button
          onClick={() => toggleEdit(name)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 
            hover:bg-blue-50 active:scale-95 text-blue-600 hover:text-blue-700"
          disabled={editObj[name]}
        >
          <Pencil className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      {!editObj[name] ? (
        <p className="text-gray-600 leading-relaxed">{value || `No ${label.toLowerCase()} yet`}</p>
      ) : (
        <div className="flex flex-col gap-3 mt-2">
          {textarea ? (
            <textarea
              autoFocus
              name={name}
              value={dataObj[name]}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]
                transition-all"
              placeholder={placeholder}
              disabled={savingObj[name]}
            />
          ) : (
            <input
              autoFocus
              type={type}
              name={name}
              value={dataObj[name]}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all"
              placeholder={placeholder}
              disabled={savingObj[name]}
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => submitField(name)}
              disabled={savingObj[name]}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-all duration-200 hover:shadow-md active:scale-95 
                disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {savingObj[name] ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => cancelEdit(name)}
              disabled={savingObj[name]}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                transition-all duration-200 active:scale-95 
                disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
  const EditableSelectField = ({ label, name, value, options }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">{label}</h3>
        <button
          onClick={() => toggleEdit(name)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all 
            hover:bg-blue-50 text-blue-600"
          disabled={editObj[name]}
        >
          <Pencil className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      {!editObj[name] ? (
        <p className="text-gray-600">{value}</p>
      ) : (
        <div className="flex flex-col gap-3 mt-2">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={savingObj[name]}
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => submitField(name)}
              disabled={savingObj[name]}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {savingObj[name] ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => cancelEdit(name)}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-backGray p-6">
      <div className="max-w-7xl mx-auto">
        <div className={`${cardBg} ${textPrimary}  rounded-xl shadow-sm p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedFields / totalFields) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {completedFields}/{totalFields} Complete
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm font-semibold text-gray-700">Publish Course</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={dataObj.isPublished}
                    onChange={handlePublishToggle}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${dataObj.isPublished ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${dataObj.isPublished ? 'translate-x-5' : 'translate-x-0.5'} translate-y-0.5`}></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap size={24} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Course Information</h2>
              </div>

              <div className="space-y-5">
                <EditableField
                  label="Course Title"
                  name="title"
                  value={dataObj.title}
                  placeholder="e.g. Complete Web Development Bootcamp"
                />

                <EditableField
                  label="Course Description"
                  name="description"
                  value={dataObj.description}
                  placeholder="Provide a detailed description of what students will learn in this course..."
                  textarea
                />

                {/* Category */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 text-lg">Category</h3>
                    <button
                      onClick={() => toggleEdit("categoryId")}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all 
                        hover:bg-blue-50 text-blue-600"
                      disabled={editObj.categoryId}
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  </div>

                  {!editObj.categoryId ? (
                    <p className="text-gray-600">
                      {categories.find(c => c.id === dataObj.categoryId)?.name || "No category selected"}
                    </p>
                  ) : (
                    <div className="flex flex-col gap-3 mt-2">
                      <select
                        name="categoryId"
                        value={dataObj.categoryId}
                        onChange={onChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={savingObj.categoryId}
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => submitField("categoryId")}
                          disabled={savingObj.categoryId}
                          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                          {savingObj.categoryId ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => cancelEdit("categoryId")}
                          className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <EditableField
                    label="Price ($)"
                    name="price"
                    value={dataObj.price}
                    type="number"
                    placeholder="99.99"
                  />
                  <EditableField
                    label="Duration (hours)"
                    name="duration"
                    value={dataObj.duration}
                    type="number"
                    placeholder="10"
                  />
                </div>

                {/* Level & Language */}
                <div className="grid grid-cols-2 gap-4">
                  <EditableSelectField
                    label="Level"
                    name="level"
                    value={dataObj.level}
                    options={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
                  />
                  <EditableSelectField
                    label="Language"
                    name="language"
                    value={dataObj.language}
                    options={['English', 'Spanish', 'French', 'German', 'Chinese', 'Hindi']}
                  />
                </div>

                {/* Thumbnail Upload */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Course Thumbnail</h3>
                  {dataObj.imageUrl ? (
                    <div className="relative group">
                      <img
                        src={dataObj.imageUrl}
                        alt="Thumbnail"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => updateField('imageUrl', '')}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full 
                          hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 
                      border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 
                      transition-colors bg-gray-50/50">
                      <Upload className="w-10 h-10 text-gray-400 mb-3" />
                      <span className="text-sm font-medium text-gray-600 mb-1">Upload Course Thumbnail</span>
                      <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'imageUrl')}
                        className="hidden"
                        disabled={savingObj.imageUrl}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Chapters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-800">Course Chapters</h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {chapters.length}
                </span>
              </div>

              <button
                onClick={() => openChapterModal()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r 
                  from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800
                  transition-all shadow-sm hover:shadow-md mb-5 font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Chapter</span>
              </button>

              {chapters.length === 0 ? (
                <div className="text-center py-12">
                  <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No chapters yet</p>
                  <p className="text-gray-400 text-xs mt-1">Add your first chapter to get started</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-2">
                  {chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, chapter)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, chapter)}
                      onDragEnd={handleDragEnd}
                      className={`bg-white rounded-lg p-3 sm:p-4 shadow-md cursor-move
                        transition-all duration-200 hover:shadow-lg hover:scale-[1.01]
                        ${draggedItem?.id === chapter.id ? 'opacity-50' : 'opacity-100'}`}
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <div className="flex items-start gap-2 sm:gap-3 flex-1">
                          <RiDraggable className="flex-shrink-0 mt-0.5 text-gray-400" />
                          <span
                            className="text-gray-800 text-sm sm:text-base font-medium break-words overflow-hidden"
                            title={chapter.title}
                          >
                            {chapter.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => openChapterModal(chapter)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit chapter"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteChapter(chapter.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete chapter"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg 
              hover:bg-gray-50 transition-colors font-semibold shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={saveCourse}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
              hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Course"}
          </button>
        </div>
      </div>

      {/* Chapter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingChapter ? 'Edit Chapter' : 'Add New Chapter'}
              </h3>
              <button
                onClick={closeChapterModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chapter Title *
                </label>
                <input
                  type="text"
                  value={chapterForm.title}
                  onChange={(e) => setChapterForm(prev => ({ ...prev, title: e.target.value }))}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Introduction to JavaScript"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={chapterForm.description}
                  onChange={(e) => setChapterForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Brief description of what this chapter covers..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={chapterForm.duration}
                  onChange={(e) => setChapterForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 15"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chapterForm.isPreview === true}
                    onChange={(e) => setChapterForm(prev => ({ ...prev, isPreview: e.target.checked ? true : null }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Make this chapter a preview</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload Video *
                </label>
                {chapterForm.attachMentUrl ? (
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <video
                      src={chapterForm.attachMentUrl}
                      controls
                      className="w-full h-64 object-contain"
                    />
                    <button
                      onClick={() => setChapterForm(prev => ({ ...prev, attachMentUrl: '' }))}
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full 
                        hover:bg-red-600 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 
                    border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 
                    transition-colors bg-gray-50/50">
                    <Video className="w-12 h-12 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-600 mb-1">Upload Chapter Video</span>
                    <span className="text-xs text-gray-500">MP4, MOV, AVI up to 500MB</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={closeChapterModal}
                className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg 
                  hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>

              <button
                disabled={isChapterLoading}
                onClick={saveChapter}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
    transition-colors font-semibold shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isChapterLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Updating...
                  </>
                ) : (
                  'Add Chapter'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteChapterId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
            <h1 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this chapter?
            </h1>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteChapter}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteChapterId(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCreatePage;