import Message from "../models/messages.js";

export const conversationSidebar = async (req, res) => {
  const conversation = await Message.aggregate([
    {
      $group: {
        _id: "$wa_id",
        lastMessage: { $last: "$text" },
        name: { $last: "$name" },
      },
    },
  ]);

  res.json(conversation);
};

export const conversationMessages = async (req, res) => {
  const message = await Message.find({ wa_id: req.params.wa_id }).sort({
    timestamp: 1,
  });

  res.json(message);
};
