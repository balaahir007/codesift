export const extractErrorMessage = (error, defaultMsg = "Something went wrong") => {
  if (!error) return defaultMsg;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data?.errors?.length > 0) {
    return error.response.data.errors[0].msg;
  }
  if (error.message) return error.message;
  return defaultMsg;
};
