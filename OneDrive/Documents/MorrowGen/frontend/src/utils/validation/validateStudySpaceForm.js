function validateStudySpaceForm(formData) {
    let errors = {};
    const { name, domain, goal, techSkills, tags,  rules } = formData;

    // Validate Study Space Name
    if (!name?.trim()) {
        errors.name = 'Study Space Name is required';
    }

    // Validate Domain
    if (!domain?.trim()) {
        errors.domain = 'Domain is required';
    }

    // Validate Goal
    if (!goal?.trim()) {
        errors.goal = 'Learning Goal is required';
    }

    // Validate Technical Skills
    if (!techSkills?.trim()) {
        errors.techSkills = 'Technical Skills are required';
    }

    // Optional validations (example: tags must be at least 1)
    if (tags.length === 0) {
        errors.tags = 'Please add at least one tag';
    }

    // Optional logo check
    if (!logo) {
        errors.logo = 'Logo is required'; // Uncomment if you want logo to be required
    }

    // Rules are optional but if present, must not be empty
    if (rules && !rules.trim()) {
        errors.rules = 'Community Rules cannot be empty';
    }

    return errors;
}
export default validateStudySpaceForm;
