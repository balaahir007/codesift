import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { validateParticipantForm } from '../../utils/validation/validateParticipantForm';
import useSessionManagementStore from '../../zustand/sessionManagementStore/useSessionManagementStore';

const AddParticipantForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    participantName: '',
    participantNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
  };

  const { addParticipant, participantLoading } = useSessionManagementStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateParticipantForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Data is valid
    try {
      addParticipant(formData)
      // setFormData({ participantName: '', participantNumber: '' });
    } catch (error) {

    }
  };

  return (
    <div>
      <div className='flex justify-end ' onClick={onClose}>
        <RiCloseLine className='text-2xl hover:text-red-600 cursor-pointer' />
      </div>

      <form onSubmit={handleSubmit} className="p-4 rounded ">
        <h3 className="text-lg font-semibold text-[#0097B2] mb-3">Add Participant</h3>

        <div className='flex flex-col gap-2'>
          <input
            type="text"
            name="participantName"
            placeholder="Name"
            value={formData.participantName}
            className="w-full p-2 border rounded mb-1 outline-none"
            onChange={handleChange}
          />
          {errors.participantName && <p className="text-red-600 text-sm mb-2">{errors.participantName}</p>}
          <input
            type="tel"
            name="participantNumber"
            placeholder="Mobile Number"
            value={formData.participantNumber}
            className="w-full p-2  border rounded mb-3 outline-none"
            onChange={handleChange}
          />
          {errors.participantNumber && <p className="text-red-600 text-sm mb-2">{errors.participantNumber}</p>}

        </div>

        <button
          type="submit"
          className={`bg-[#0097B2] text-white px-4 py-2 rounded-md cursor-pointer transition duration-200 flex items-center justify-center gap-2 ${participantLoading ? 'opacity-80 cursor-not-allowed' : 'hover:scale-105 hover:bg-[#00B2A9]'
            }`}
          disabled={participantLoading}
        >
          {!participantLoading ? (
            <>
              <span className='animate-pulse'>Adding...</span>
            </>
          ) : (
            <span>Add Participant</span>
          )}
        </button>

      </form>
    </div>
  );
};

export default AddParticipantForm;
