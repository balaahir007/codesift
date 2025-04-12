import { GoPencil } from "react-icons/go";
import { assets } from "../../assets/assets";
import { useRef, useState } from "react";
import UserNotLogin from "./UserNotLogin";
import { useAuthStore } from "../../zustandStateManagement/useAuthstore";

const MyProfile = () => {
  const { updateProfile, authUser } = useAuthStore();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    authUser.profilePic || assets.myProfileIcon
  );
  const [editUser, setEditUser] = useState(false);
  const [username, setUsername] = useState(authUser?.username || "Username");
  const [email, setEmail] = useState(authUser?.email || "");

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB
      alert("File too large! Please upload under 5MB.");
      return;
    }
    if (file) {
      const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setProfileImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }
  };

  const handleUserEdit = () => {
    setEditUser(true);
  };

  const handleSave = () => {
    const updatedUser = { ...authUser, username, email };
    setEditUser(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="shadow-lg w-80 h-40 flex items-center rounded-md border-[#C9F7CF] border px-6 py-4 gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={profileImage}
            alt="Profile"
            className="size-16 rounded-full object-cover shadow-md"
          />
          {authUser && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <GoPencil
                className="absolute bottom-1 right-1 cursor-pointer text-gray-500 bg-white rounded-full p-1 shadow"
                onClick={handleFileInputClick}
              />
            </div>
          )}
        </div>
        <h2 className="text-md font-semibold text-gray-700 max-w-40 break-words">
          {username}
        </h2>
      </div>

      {authUser ? (
        <div className="w-80">
          <button
            className="flex items-center gap-1 mt-4 mx-65"
            onClick={handleUserEdit}
          >
            <GoPencil className="cursor-pointer text-white bg-blue-500 rounded-full p-1 shadow" />
            <span className="text-sm text-[#1F88BE]">Edit</span>
          </button>

          {editUser ? (
            <div className="flex flex-col m-4">
              <input
                type="text"
                className="bg-[#E6E8E6] text-sm text-gray-600 border-[#C9F7CF] p-2 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={50}
              />
              <input
                type="email"
                className="bg-[#E6E8E6] border-[#C9F7CF] text-sm text-gray-600 p-2 rounded-md mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={50}
              />
              <button
                className="text-sm bg-[#1F88BE] px-3 py-1 mt-3 rounded-lg text-white w-full"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col m-4">
              <input
                type="text"
                className="bg-[#E6E8E6] text-sm text-gray-600 border-[#C9F7CF] p-2 rounded-md"
                value={username}
                disabled
              />
              <input
                type="text"
                className="bg-[#E6E8E6] border-[#C9F7CF] text-sm text-gray-600 p-2 rounded-md mt-2"
                value={email}
                disabled
              />
            </div>
          )}
        </div>
      ) : (
        <UserNotLogin />
      )}
    </div>
  );
};

export default MyProfile;
