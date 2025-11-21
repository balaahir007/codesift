export const validateJobForm = (formData) => {
  const errors = {};

  // Required text fields
  if (!formData.title?.trim()) errors.title = "Job title is required.";
  if (!formData.location?.trim()) errors.location = "Location is required.";

  // Type validation
  const validTypes = ['full-time', 'part-time', 'contract', 'internship', 'remote'];
  if (!validTypes.includes(formData.type)) 
    errors.type = "Please select a valid job type.";

  if (!formData.salary?.trim()) errors.salary = "Salary information is required.";
  if (!formData.description?.trim()) errors.description = "Job description is required.";
  if (!formData.requirements?.trim()) errors.requirements = "Requirements are required.";
  if (!formData.responsibilities?.trim()) errors.responsibilities = "Responsibilities are required.";
  if (!formData.experience?.trim()) errors.experience = "Experience level is required.";
  if (!formData.positions || isNaN(formData.positions) || Number(formData.positions) <= 0)
    errors.positions = "Please enter a valid number of positions.";
  if (!formData.educationLevel?.trim())
    errors.educationLevel = "Please select an education level.";
  if (!formData.tags || formData.tags.length === 0)
    errors.tags = "Please add at least one skill tag.";
  if (!formData.deadline) errors.deadline = "Application deadline is required.";

  return errors;
};
