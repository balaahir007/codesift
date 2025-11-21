import axios from "axios";

const uploadFile = async (file) => {
  const cloudName = "dxbeg10cj";
  const uploadPreset = "Morrow_Gen";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, // ✅ "raw" allows PDFs, DOCs, etc.
      formData
    );

    if (!response.data) {
      throw new Error("Error uploading file to Cloudinary");
    }

    console.log("File uploaded successfully:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error.message);
    throw new Error(error.message || "Cloudinary Upload Failed");
  }
};

export default uploadFile;
