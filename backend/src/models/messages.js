import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read", "prending"],
    default: "sent",
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  message_id: {
    type: String,
    required: true,
    unique: true,
  },
  meta_msg_id: {
    type: String,
  },
  from: {
    type: String,
  },
});

const Message = mongoose.model("Message", MessageSchema, "processed_messages");

export default Message;
