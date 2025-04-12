
const uploadImage = async (imageFile) => {
  const CLOUD_NAME = "dywpzehm7";
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = 'Farmsnap'

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.secure_url; 
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};
export default uploadImage;
