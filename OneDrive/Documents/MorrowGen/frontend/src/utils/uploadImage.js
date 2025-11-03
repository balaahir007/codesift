import axios from "axios";

const uploadImage = async (file) => {
  const cloudName = "dxbeg10cj";
  const uploadPreset = "Morrow_Gen";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    if (!response.data) {
      throw new Error("Error in upload image in cloudinary");
    }
    console.log("Image uploaded successfully:", response.data.secure_url);
    
    return response.data.secure_url;
  } catch (error) {
    throw new Error(error.message || "Cloudinary Upload Failed:");
  }
};

export default uploadImage;
