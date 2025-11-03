export const validateForm = (formData) => {
    const errors = {};

    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'time is required';

    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;

    if (formData.gmeetLink && !urlRegex.test(formData.gmeetLink))
        errors.gmeetLink = 'Enter a valid Google Meet URL';

    if (formData.whatsappLink && !urlRegex.test(formData.whatsappLink))
        errors.whatsappLink = 'Enter a valid WhatsApp URL';

    if (formData.selectedGroups.length === 0)
        errors.selectedGroups = 'Please select at least one group';

    return errors;
};
