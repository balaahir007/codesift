import React, { useState, useEffect } from 'react';
import CreateStudySpaceForm from '../../components/admin/CreateStudySpaceForm';
import useStudySpacesStore from '../../zustand/studySpaces/useStudySpaceStore';
import StudySpaceCards from '../../components/admin/StudySpaceCards';
const AdminStudySpaceManagement = () => {
  const { getAllStudySpaces, allStudySpaces } = useStudySpacesStore();
  const [openForm, setOpenForm] = useState(false);
  const [studySpaces, setStudySpaces] = useState([]);

  useEffect(() => {
    getAllStudySpaces();
  }, []);

  useEffect(() => {
    if (allStudySpaces) {
      const dataArray = Array.isArray(allStudySpaces)
        ? allStudySpaces
        : Object.values(allStudySpaces);
      setStudySpaces(dataArray);
    }
  }, [allStudySpaces]);

  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">StudySpace Management</h2>

      <button
        onClick={() => setOpenForm(true)}
        className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md transition"
      >
        + Add StudySpace
      </button>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {studySpaces.length > 0 ? (
          studySpaces.map((space, index) => (
            <div
              key={space._id || index}
              className=" mt-4 rounded-md "
            >
            <StudySpaceCards studySpace={space} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No StudySpaces yet. Click above to add one.</p>
        )}
      </div>

      {openForm && <CreateStudySpaceForm />}
    </div>
  );
};

export default AdminStudySpaceManagement;
