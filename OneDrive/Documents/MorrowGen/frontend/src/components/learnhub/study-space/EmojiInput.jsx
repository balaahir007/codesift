import React from "react";
import EmojiPicker from "emoji-picker-react";
import ReactDOM from "react-dom";

const EmojiInput = ({ setFormInput, onClose }) => {
  const handleEmojiClick = (emojiData) => {
    setFormInput((prev) => ({
      ...prev,
      description: prev.description + emojiData.emoji,
    }));
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-white p-2  rounded shadow-lg">
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>,
    document.body
  );
};

export default EmojiInput;
