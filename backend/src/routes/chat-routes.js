import { Router } from "express";
import { verifyToken } from "../utils/token-managers.js";
import { generateChatCompletion } from "../controllers/chat-controller.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

export default chatRoutes;
