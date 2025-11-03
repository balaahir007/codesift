import { validDomains } from "../../assets/learnhub/learnhubAssets";

export const newMockInterviewFormValidation = (formData) => {
  const errors = {};

  if (!formData.domain) {
    errors.domain = "Domain is required";
  } else if (!validDomains.includes(formData.domain.toLowerCase())) {
    errors.domain = "Invalid domain entered";
  }

  if (!formData.type) {
    errors.type = "Interview type is required";
  }

  if (!formData.experience) {
    errors.experience = "Experience is required";
  } else if (
    formData.experience.toLowerCase() !== "fresher" &&
    (isNaN(Number(formData.experience)) || Number(formData.experience) < 0)
  ) {
    errors.experience =
      'Experience should be "fresher" or a valid non-negative number';
  } else if (formData.experience > 50) {
    errors.experience = "Experience should not exceed 50 years";
  } else if (formData.timer < 5 || formData.timer > 30) {
    errors.timer = "Timer must be between 5 and 30 minutes";
  } else if (formData.questionAmount < 1 || formData.questionAmount > 40) {
    errors.questionAmount = "Number of questions must be between 1 and 10";
  }
  return errors;
};

export const resumeFormValidation = (formData) => {
  const errors = {};

  if (!formData.type) {
    errors.type = "Question type is required.";
  }
  if (!formData.timer) {
    errors.timer = "Timer is required";
  }
  if (!formData.questionAmount) {
    errors.questionAmount = "Question amount is required.";
  }
  if (!formData.level) {
    errors.level = "Question level is required.";
  }

  // Validate file
  if (!formData.file) {
    errors.file = "Resume file is required.";
  } else {
    if (formData.file.type !== "application/pdf") {
      errors.file = "Only PDF files are allowed.";
    }
    const maxSize = 5 * 1024 * 1024;
    if (formData.file.size > maxSize) {
      errors.file = "File size must be less than 5MB.";
    }
  }

  return errors;
};
