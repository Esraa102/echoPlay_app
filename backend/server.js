import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./db/connectDB.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/auth", authRoute);

connectToDB();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
