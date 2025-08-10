import Message from "../models/messages.js";

export const sendMessage = async (req, res) => {
  const { wa_id, name, text } = req.body;
  const message = await Message.create({
    wa_id,
    name,
    text,
    status: "sent",
    timeStamp: new Date(),
    message_id: Date.now().toString(),
  });

  res.json(message);
};
