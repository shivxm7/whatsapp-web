import { createSlice } from "@reduxjs/toolkit";

const getMessagesSlice = createSlice({
  name: "messages",
  initialState: {
    users: [],
    messages: [],
    selectedUser: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setUsers, setMessages, setSelectedUser, addMessage } =
  getMessagesSlice.actions;

export default getMessagesSlice.reducer;
