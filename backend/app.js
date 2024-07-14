import express from "express";
import morgan from "morgan";
import appRouter from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import path from "path";
import { fileURLToPath } from "url";

const secret = process.env.COOKIE_SECRET;
const frontendBaseURL = process.env.FRONTEND_BASEURL;

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(secret));
app.use(
  cors({
    origin: frontendBaseURL,
    credentials: true,
  })
);

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//endpoints
app.use("/api/v1/", appRouter);

export default app;
