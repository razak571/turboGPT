import express from "express";
import userRoute from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = express.Router();

appRouter.use("/user", userRoute);
appRouter.use("/chat", chatRoutes); //approuter i t is

export default appRouter;
