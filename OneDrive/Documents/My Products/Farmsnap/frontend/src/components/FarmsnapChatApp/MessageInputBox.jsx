import { useRef, useState } from "react";
import { userChatStore } from "../../zustandStateManagement/userChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {sendMessages} = userChatStore()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    const messagesData = {
      text,
      image : imagePreview
    }
    sendMessages(messagesData)
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-400"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 text-black text-xs flex items-center justify-center hover:bg-red-400"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-2 rounded-lg border text-sm ${
              imagePreview
                ? "bg-green-100 text-green-700 border-green-400"
                : "bg-gray-100 text-gray-600 border-gray-300"
            } hover:bg-gray-200`}
          >
            📷
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
