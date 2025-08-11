import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import {
  setUsers,
  setMessages,
  setSelectedUser,
  addMessage,
} from "./store/getMessagesSlice";
import { getConversation, getMessages, sendMessage } from "./api";

export default function App() {
  const dispatch = useDispatch();
  const { users, selectedUser, messages } = useSelector(
    (state) => state.messages
  );

  const myNumber = "918329446654"; // Your own WhatsApp number

  // Load all users on start
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getConversation();
        dispatch(setUsers(data));
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };
    loadUsers();
  }, [dispatch]);

  // Load messages for selected user
  const loadMessages = async (wa_id) => {
    try {
      // console.log("wa_id:", wa_id);
      const data = await getMessages(wa_id);
      dispatch(setMessages(data));
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  // Handle selecting a user
  const handleSelectUser = (user) => {
    // console.log("handleSelectUser got:", user);
    dispatch(setSelectedUser(user));
    loadMessages(user._id);
  };

  // Handle sending a message
  const handleSend = async ({ wa_id, name, text }) => {
    try {
      const newMsg = {
        wa_id,
        name,
        text,
        from: myNumber,
        status: "sent",
        message_id: Date.now().toString(), // temporary ID
      };

      dispatch(addMessage({ ...newMsg, from: myNumber }));

      // Send to backend
      await sendMessage({ wa_id, name, text, from: myNumber });

      // Reload messages from DB to ensure tick status
      loadMessages(wa_id);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="flex  h-screen">
      <Sidebar
        users={users}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
      />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {selectedUser ? (
          <ChatWindow
            wa_id={selectedUser._id}
            conversations={users}
            messages={messages}
            onSend={handleSend}
            myNumber={myNumber}
          />
        ) : (
          <div className="flex items-center justify-center text-md md:text-3xl h-full text-black bg-[#d2d2d2]">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
