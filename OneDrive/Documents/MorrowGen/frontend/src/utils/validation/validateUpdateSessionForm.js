export const validateUpdateSessionForm = (data) => {
  const errors = {};

  console.log(data,"Data");
  

  // Title
  if (!data.title?.trim()) {
    errors.title = 'Title is required';
  }

  // Description
  if (!data.description?.trim()) {
    errors.description = 'Description is required';
  }

  // Date
  if (!data.date) {
    errors.date = 'Date is required';
  }

  // Time
  if (!data.time) {
    errors.time = 'Time is required';
  }

  // GMeet Link
  if (!data.gmeetLink?.trim()) {
    errors.gmeetLink = 'Google Meet link is required';
  }

  // WhatsApp Link
  if (!data.whatsappLink?.trim()) {
    errors.whatsappLink = 'WhatsApp link is required';
  }

  // Selected Groups
  if (!data.selectedGroups || data.selectedGroups.length === 0) {
    errors.selectedGroups = 'Please select at least one group';
  }

  // Image (handle both file and default URL)
  const hasFile = typeof data.imageUrl === 'object' && data.imageUrl instanceof File;
  const hasUrl = typeof data.imageUrl === 'string' && data.imageUrl.startsWith('http');

  if (!hasFile && !hasUrl) {
    errors.imageUrl = 'Please upload an image or keep the default one';
  }

  return errors;
};
