export const validateParticipantForm = ({ participantName, participantNumber }) => {
  const errors = {};

  if (!participantName || participantName.trim().length < 3) {
    errors.participantName = "Please enter a valid name (at least 3 letters).";
  } else if (!/^[a-zA-Z\s]+$/.test(participantName)) {
    errors.participantName = "Name can only contain letters and spaces.";
  }

  if (!/^[6-9]\d{9}$/.test(participantNumber)) {
    errors.participantNumber = "Please enter a valid 10-digit mobile number.";
  }

  return errors;
};
