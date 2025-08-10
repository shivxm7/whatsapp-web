import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./getMessagesSlice";

const appStore = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});

export default appStore;
