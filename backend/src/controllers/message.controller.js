import Message from "../models/messages.js";

export const sendMessage = async (req, res) => {
  try {
    const { wa_id, name, text, from } = req.body;
    if (!wa_id || !text || !from) {
      return res
        .status(400)
        .json({ error: "wa_id, text, and from are required" });
    }

    const newMsg = new Message({
      wa_id,
      name,
      text,
      from, // store sender's number
      timestamp: new Date(),
      status: "sent",
      message_id: Date.now().toString(),
    });

    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};
