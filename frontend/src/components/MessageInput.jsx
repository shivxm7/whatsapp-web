// src/components/MessageInput.jsx
import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-sm bg-[#e9e9e9] text-black border-none outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        Send
      </button>
    </form>
  );
}
