import { validDomains } from "../../assets/learnhub/learnhubAssets";

export const studyGroupFormValidation = (values = {}, step = 1) => {
  const errors = {};
  console.log("Validating values for step:", step, values);

  if (step === 1) {
    // Group Name
    if (!values.name || typeof values.name !== "string" || values.name.trim() === "") {
      errors.name = "Group name is required.";
    }

    // Domain
    if (!values.domain || typeof values.domain !== "string" || values.domain.trim() === "") {
      errors.domain = "Domain is required.";
    } else if (!validDomains.includes(values.domain.trim())) {
      errors.domain = "Invalid domain selected.";
    }
  } else if (step === 2) {
    // Goal
    if (!values.goal || typeof values.goal !== "string" || values.goal.trim() === "") {
      errors.goal = "Goal is required.";
    }

    // Tech Skills
    if (!values.techSkills || typeof values.techSkills !== "string" || values.techSkills.trim() === "") {
      errors.techSkills = "Tech skills are required.";
    }

    // Logo
    if (!values.logo) {
      errors.logo = "Logo is required.";
    } else if (!values.logo.name?.match(/\.(jpg|jpeg|png|gif)$/i)) {
      errors.logo = "Logo must be an image file (jpg, jpeg, png, gif).";
    }
  }

  return errors;
};
