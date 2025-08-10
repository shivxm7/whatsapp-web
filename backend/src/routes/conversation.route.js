import express from "express";
import {
  conversationSidebar,
  conversationMessages,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/", conversationSidebar);

router.get("/:wa_id", conversationMessages);

export default router;
