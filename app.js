import express from "express";
import path from "path";
import { router as userRouter } from "./routes/users.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { taskRouter } from "./routes/tasks.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
  path: "./data/config.env",
});

export const app = express();

//using middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/users", userRouter);
app.use("/task", taskRouter);
//error handling middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "to-do app server running",
    endpoints: [
      {
        users: ["/all", "/me", "/new", "/login", "/logout"],
      },
      {
        task: ["/create", "/my", "/id"],
      },
    ],
  });
});
