import React, { useState } from 'react';
import { validateForm } from '../../utils/validation/sessionFormValidation';
import useSessionManagementStore from '../../zustand/sessionManagementStore/useSessionManagementStore';
import { RiCloseLine } from "react-icons/ri";
import uploadImage from '../../utils/uploadImage';

const SessionForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: 'CRUD Operations using Node.js & postgreSq',
        description: `What is Node.js? What is postgreSql?
✅ Understanding the basics of backend development`,
        date: '',
        time: '',
        gmeetLink: 'https://meet.google.com/xqs-wmmf-mck',
        whatsappLink: 'https://chat.whatsapp.com/EoH6loZv1xHGyo9cpSmnio',
        imageUrl: null,
        selectedGroups: [],
        selectAll: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files, type, checked, options } = e.target;

        if (name === 'imageUrl') {
            setFormData((prev) => ({ ...prev, imageUrl: files[0] }));
        } else if (name === 'selectedGroups') {
            const selected = Array.from(options)
                .filter((option) => option.selected)
                ?.map((option) => option.value);
            setFormData((prev) => ({
                ...prev,
                selectedGroups: selected,
                selectAll: selected.length === groupsData?.length,
            }));
        } else if (name === 'selectAllGroups') {
            if (checked) {
                setFormData((prev) => ({
                    ...prev,
                    selectedGroups: groupsData?.map(group => group.id.toString()),
                    selectAll: true,
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    selectedGroups: [],
                    selectAll: false,
                }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const [isSending, setIsSending] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);

    const { sendSession, scheduleSession, groupsData } = useSessionManagementStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData(e.target);
        const actionType = e.nativeEvent.submitter?.value;

        // Start local loading immediately
        if (actionType === 'send') setIsSending(true);
        if (actionType === 'schedule') setIsScheduling(true);

        const selectedGroups = formDataObj.getAll('selectedGroups');

        const dataObj = {
            ...Object.fromEntries(formDataObj.entries()),
            selectedGroups,
        };

        const validationErrors = validateForm(dataObj);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSending(false);
            setIsScheduling(false);
            return;
        }

        const imageFile = formDataObj.get('imageUrl');
        const imageUrl = imageFile ? await uploadImage(imageFile) : null;

        setFormData((prev) => ({
            ...prev,
            imageUrl: imageUrl,
        }));

        dataObj.imageUrl = imageUrl;

        if (actionType === 'send') {
            await sendSession(dataObj);
        } else if (actionType === 'schedule') {
            await scheduleSession(dataObj);
        }

        setIsSending(false);
        setIsScheduling(false);
        onClose();
    };


    return (
        <div>
            <div className='flex justify-end' onClick={onClose}>
                <RiCloseLine className='text-2xl hover:text-red-600 cursor-pointer' />
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl px-4 sm:px-6 pb-6 max-h-[80vh] overflow-y-auto w-full max-w-86 sm:max-w-md mx-auto space-y-5"
                encType="multipart/form-data"
            >
                <h2 className="text-xl font-semibold text-[#0097B2] mb-4">Create New Session</h2>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00B2A9]"
                        placeholder="Session Title"
                    />
                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00B2A9]"
                        placeholder="Describe the session"
                    />
                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <label className="text-gray-700 font-semibold" htmlFor="date">Date & Time</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B2A9]"
                    />
                    {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}

                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B2A9]"
                    />
                    {errors.time && <p className="text-sm text-red-600">{errors.time}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="gmeetLink">Google Meet Link</label>
                    <input
                        type="url"
                        id="gmeetLink"
                        name="gmeetLink"
                        value={formData.gmeetLink}
                        onChange={handleChange}
                        placeholder="https://meet.google.com/xyz-abc"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00B2A9]"
                    />
                    {errors.gmeetLink && <p className="text-sm text-red-600">{errors.gmeetLink}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="whatsappLink">WhatsApp Group Link</label>
                    <input
                        type="url"
                        id="whatsappLink"
                        name="whatsappLink"
                        value={formData.whatsappLink}
                        onChange={handleChange}
                        placeholder="https://chat.whatsapp.com/xyzabc"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00B2A9]"
                    />
                    {errors.whatsappLink && <p className="text-sm text-red-600">{errors.whatsappLink}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="selectedGroups">Select Groups to Share</label>
                    <select
                        id="selectedGroups"
                        name="selectedGroups"
                        multiple
                        value={formData.selectedGroups}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#00B2A9]"
                    >
                        {groupsData?.map((group) => (
                            <option key={group.id} value={group.groupName}>
                                {group.groupName}
                            </option>
                        ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple groups.</p>
                    {errors.selectedGroups && <p className="text-sm text-red-600">{errors.selectedGroups}</p>}
                </div>

                <div>
                    <label htmlFor="selectAllGroups" className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            name="selectAllGroups"
                            id="selectAllGroups"
                            onChange={handleChange}
                            checked={formData.selectAll}
                        />
                        <span className='text-sm'>Select All Groups</span>
                    </label>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="imageUrl">Upload Image</label>
                    <input
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                    />
                    {formData.imageUrl && (
                        <p className="mt-2 text-sm text-gray-600">
                            Selected file: {formData.imageUrl.name}
                        </p>
                    )}
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="submit"
                        name="action"
                        value="schedule"
                        disabled={isScheduling}
                        className="bg-[#0097B2] flex items-center justify-center gap-2 hover:bg-[#00B2A9] text-white text-sm px-4 py-2 rounded-md transition duration-200"
                    >
                        {isScheduling ? (
                            <>
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                <span>Scheduling...</span>
                            </>
                        ) : (
                            <span>Schedule</span>
                        )}
                    </button>

                    <button
                        type="submit"
                        name="action"
                        value="send"
                        disabled={isSending}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition duration-200 disabled:opacity-50"
                    >
                        {isSending ? (
                            <>
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                <span>Sending...</span>
                            </>
                        ) : (
                            <span>Send Now</span>
                        )}
                    </button>



                </div>
            </form>
        </div>
    );
};

export default SessionForm;
