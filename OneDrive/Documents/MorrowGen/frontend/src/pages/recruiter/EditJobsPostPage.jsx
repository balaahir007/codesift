import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useJobStore from '../../zustand/recruiter/useJobStore'; // your store
import JobPostForm from './JobPostPage';

const EditJobsPostPage = () => {
  const { id } = useParams();
  console.log("Id : ",id)
  const navigate = useNavigate();
  const { getJobById, updateJob } = useJobStore();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch job data by id
    const fetchJob = async () => {
      const job = await getJobById(id);
      console.log("Job Data : ",job)
      setFormData(job);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async () => {
    await updateJob(id, formData);
    navigate('/jobs'); // Redirect after update
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <JobPostForm job={formData} isEditing={true} />
    </div>
  );
};

export default EditJobsPostPage;
