import React, { useEffect, useState } from 'react';
import useSessionManagementStore from '../../zustand/sessionManagementStore/useSessionManagementStore';
import { RiCloseLine } from "react-icons/ri";
import uploadFile from '../../utils/uploadFile';
import { validateUpdateSessionForm } from '../../utils/validation/validateUpdateSessionForm';

const EditSessionForm = ({ onClose, EditData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        gmeetLink: '',
        whatsappLink: '',
        imageUrl: null,
        selectedGroups: [],
        selectAll: false,
    });


const [errors, setErrors] = useState({});
const { groupsData, updateSession, isUpdateSessionLoading } = useSessionManagementStore();

useEffect(() => {
    if (EditData) {
        setFormData({
            title: EditData.title || '',
            description: EditData.description || '',
            date: EditData.date || '',
            time: EditData.time || '',
            gmeetLink: EditData.gmeetLink || '',
            whatsappLink: EditData.whatsappLink || '',
            imageUrl: EditData.imageUrl || null,
            selectedGroups: (EditData.selectedGroups || []).filter(Boolean),
            selectAll: (EditData.selectedGroups || []).filter(Boolean).length === groupsData.length,
        });
    }
    
}, [EditData, groupsData]);
const handleChange = (e) => {
    const { name, value, files, type, checked, options } = e.target;

    if (name === 'imageUrl') {
        setFormData(prev => ({ ...prev, imageUrl: files[0] }));
    } else if (name === 'selectedGroups') {
        const selected = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setFormData(prev => ({
            ...prev,
            selectedGroups: selected,
            selectAll: selected.length === groupsData.length,
        }));
    } else if (name === 'selectAllGroups') {
        setFormData(prev => ({
            ...prev,
            selectedGroups: checked ? groupsData.map(g => g?.groupName) : [],
            selectAll: checked,
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const dataObj = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        gmeetLink: formData.gmeetLink,
        whatsappLink: formData.whatsappLink,
        selectedGroups: formData.selectedGroups,
        imageUrl: formData.imageUrl,
    };

    const validationErrors = validateUpdateSessionForm(dataObj);
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    let finalImageUrl = EditData.imageUrl;
    if (formData.imageUrl instanceof File) {
        finalImageUrl = await uploadFile(formData.imageUrl);
    } else if (typeof formData.imageUrl === 'string' && formData.imageUrl.startsWith('http')) {
        finalImageUrl = formData.imageUrl;
    }

    dataObj.imageUrl = finalImageUrl;

    await updateSession({ dataObj, id: EditData.id });
    onClose();
};

return (
    <div>
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#0097B2]">Edit Session</h2>
            <RiCloseLine onClick={onClose} className="text-2xl hover:text-red-600 cursor-pointer" />
        </div>

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl px-4 sm:px-6 pb-6 max-h-[80vh] overflow-y-auto w-full max-w-86 sm:max-w-md mx-auto space-y-5"
            encType="multipart/form-data"
        >
            {/* Title */}
            <div>
                <label htmlFor="title" className="block mt-5 text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Session Title"
                    className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the session"
                    className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Date & Time */}
            <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-semibold">Date & Time</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                />
                {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}

                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                />
                {errors.time && <p className="text-sm text-red-600">{errors.time}</p>}
            </div>

            {/* GMeet & WhatsApp Links */}
            <div>
                <label htmlFor="gmeetLink" className="block text-gray-700 mb-1">Google Meet Link</label>
                <input
                    type="url"
                    name="gmeetLink"
                    value={formData.gmeetLink}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/xyz-abc"
                    className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.gmeetLink && <p className="text-sm text-red-600">{errors.gmeetLink}</p>}
            </div>

            <div>
                <label htmlFor="whatsappLink" className="block text-gray-700 mb-1">WhatsApp Group Link</label>
                <input
                    type="url"
                    name="whatsappLink"
                    value={formData.whatsappLink}
                    onChange={handleChange}
                    placeholder="https://chat.whatsapp.com/xyzabc"
                    className="w-full border border-gray-300 rounded-md p-2"
                />
                {errors.whatsappLink && <p className="text-sm text-red-600">{errors.whatsappLink}</p>}
            </div>

            {/* Group Select */}
            <div>
                <label htmlFor="selectedGroups" className="block text-gray-700 mb-1">Select Groups to Share</label>
                <select
                    name="selectedGroups"
                    multiple
                    value={formData.selectedGroups}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 h-32"
                >
                    {groupsData?.map((group) => (
                        <option key={group.id} value={group?.groupName}>
                            {group?.groupName}
                        </option>
                    ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple groups.</p>
                {errors.selectedGroups && <p className="text-sm text-red-600">{errors.selectedGroups}</p>}
            </div>

            {/* Select All */}
            <div>
                <label htmlFor="selectAllGroups" className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="selectAllGroups"
                        id="selectAllGroups"
                        checked={formData.selectAll}
                        onChange={handleChange}
                    />
                    <span className="text-sm">Select All Groups</span>
                </label>
            </div>

            {/* Image Upload */}
            <div>
                <label htmlFor="imageUrl" className="block text-gray-700 mb-1">Upload Image</label>
                <input
                    type="file"
                    name="imageUrl"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                />
                {formData.imageUrl instanceof File ? (
                    <p className="mt-2 text-sm text-gray-600">Selected file: {formData.imageUrl.name}</p>
                ) : (
                    EditData?.imageUrl && (
                        <img
                            src={EditData.imageUrl}
                            alt="Uploaded"
                            className="w-full h-48 object-cover rounded-md mt-2"
                        />
                    )
                )}
                {errors.imageUrl && <p className="text-sm text-red-600">{errors.imageUrl}</p>}
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="submit"
                    disabled={isUpdateSessionLoading}
                    className={`mt-2 px-4 py-2 rounded-md text-white transition ${isUpdateSessionLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#0097B2] hover:bg-[#007F8C]"
                        }`}
                >
                    {isUpdateSessionLoading ? "Updating..." : "Update Session"}
                </button>
            </div>
        </form>
    </div>
);
};

export default EditSessionForm;
