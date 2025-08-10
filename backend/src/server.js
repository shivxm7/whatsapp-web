import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db.js";

import conversationRoutes from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();

async function startServer() {
  try {
    await connectDb();
    console.log("MongoDB connected successfully");

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/conversation", conversationRoutes);
    app.use("/message", messageRoute);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
