import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import useSessionManagementStore from '../../zustand/sessionManagementStore/useSessionManagementStore';

const CreateGroupForm = ({ participants, onClose }) => {
  // Single state object to hold groupName and selectedParticipants
  const [formState, setFormState] = useState({
    groupName: '',
    selectedParticipants: []
  });
  const [, setErrors] = useState({})

  const { createNewGroup, isCreateGroupLoading } = useSessionManagementStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createNewGroup(formState);
      onClose()
    } catch (error) {
      setErrors(error.message || "error to create a group")
    }
  };

  const handleGroupNameChange = (e) => {
    setFormState(prev => ({
      ...prev,
      groupName: e.target.value
    }));
  };

  const handleParticipantsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormState(prev => ({
      ...prev,
      selectedParticipants: selected
    }));
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allParticipantNumbers = participants.map(p => p.participantNumber);
      setFormState(prev => ({
        ...prev,
        selectedParticipants: allParticipantNumbers
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        selectedParticipants: []
      }));
    }
  };

  const isAllSelected = participants && formState.selectedParticipants.length === participants.length;

  return (
    <div>
      <div className='flex justify-end' onClick={onClose}>
        <RiCloseLine className='text-2xl hover:text-red-600 cursor-pointer' />
      </div>
      <form onSubmit={handleSubmit} className="p-4 mt-4">
        <h3 className="text-lg font-semibold text-[#0097B2] mb-2">Create New Group</h3>
        <input
          type="text"
          placeholder="Group Name"
          className="w-full p-2 border rounded mb-2"
          value={formState.groupName}
          onChange={handleGroupNameChange}
          required
        />
        <select
          multiple
          value={formState.selectedParticipants}
          onChange={handleParticipantsChange}
          className="w-full p-2 border rounded"
        >
          {participants?.map((p, index) => (
            <option key={index} value={p.participantNumber}>
              {p.participantName}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1 mb-2">Hold Ctrl (Cmd on Mac) to select multiple participants.</p>

        <label htmlFor="selectAllGroups" className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="selectAllGroups"
            checked={isAllSelected}
            onChange={handleSelectAllChange}
          />
          <span className="text-sm">Select All Participants</span>
        </label>
        <button
          type="submit"
          className="bg-[#0097B2] text-white px-4 py-2 rounded hover:bg-[#00B2A9] flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={isCreateGroupLoading}
        >
          {isCreateGroupLoading ? (
            <span className="animate-pulse">Creating...</span>
          ) : (
            <span>Create Group</span>
          )}
        </button>

      </form>
    </div>
  );
};

export default CreateGroupForm;
