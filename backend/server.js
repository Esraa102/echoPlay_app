import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connectDB.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

connectToDB();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
