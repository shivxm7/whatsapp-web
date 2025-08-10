import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db.js";

import conversationRoutes from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/conversation", conversationRoutes);
app.use("/message", messageRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
