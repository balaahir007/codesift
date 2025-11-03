import React, { useState } from 'react';

const JobUploadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    website: '',
    logoUrl: '',
    location: '',
    employmentType: 'Internship',
    duration: '',
    stipendMin: '',
    stipendMax: '',
    skills: '',
    responsibilities: '',
    qualifications: '',
    perks: '',
    deadline: '',
    recruiterName: '',
    recruiterEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: `job_${Date.now()}`,
      title: formData.title,
      company: {
        name: formData.companyName,
        website: formData.website,
        logoUrl: formData.logoUrl,
        verified: true,
      },
      location: {
        city: formData.location,
        remote: true,
        hybrid: true,
        onsite: true,
      },
      employmentType: formData.employmentType,
      workMode: 'Hybrid',
      duration: formData.duration,
      stipend: {
        min: parseInt(formData.stipendMin),
        max: parseInt(formData.stipendMax),
        currency: 'INR',
        period: 'month'
      },
      skillsRequired: formData.skills.split(',').map(s => s.trim()),
      responsibilities: formData.responsibilities.split('\n').map(r => r.trim()),
      qualifications: formData.qualifications.split('\n').map(q => q.trim()),
      perksAndBenefits: formData.perks.split(',').map(p => p.trim()),
      applicationDetails: {
        applicationDeadline: formData.deadline,
        howToApply: `Send resume to ${formData.recruiterEmail}`
      },
      recruiter: {
        name: formData.recruiterName,
        contactEmail: formData.recruiterEmail
      },
      postedDate: new Date().toISOString().split('T')[0],
      jobStatus: 'active',
      isFeatured: false,
      isNew: true
    };

    onSubmit(newJob); // pass back to parent
    setFormData({}); // reset form if needed
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Post a New Job</h2>

      <input name="title" placeholder="Job Title" className="input" onChange={handleChange} required />
      <input name="companyName" placeholder="Company Name" className="input" onChange={handleChange} required />
      <input name="website" placeholder="Company Website" className="input" onChange={handleChange} />
      <input name="logoUrl" placeholder="Logo URL" className="input" onChange={handleChange} />
      <input name="location" placeholder="City Location" className="input" onChange={handleChange} required />

      <input name="duration" placeholder="Duration (e.g., 3 months)" className="input" onChange={handleChange} />
      <input name="stipendMin" placeholder="Stipend Min (INR)" type="number" className="input" onChange={handleChange} />
      <input name="stipendMax" placeholder="Stipend Max (INR)" type="number" className="input" onChange={handleChange} />

      <textarea name="skills" placeholder="Skills (comma-separated)" className="input" onChange={handleChange} />
      <textarea name="responsibilities" placeholder="Responsibilities (one per line)" className="input" onChange={handleChange} />
      <textarea name="qualifications" placeholder="Qualifications (one per line)" className="input" onChange={handleChange} />
      <textarea name="perks" placeholder="Perks and Benefits (comma-separated)" className="input" onChange={handleChange} />

      <input name="deadline" type="date" placeholder="Application Deadline" className="input" onChange={handleChange} />

      <input name="recruiterName" placeholder="Recruiter Name" className="input" onChange={handleChange} />
      <input name="recruiterEmail" placeholder="Recruiter Email" type="email" className="input" onChange={handleChange} />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit Job</button>
    </form>
  );
};

export default JobUploadForm;
