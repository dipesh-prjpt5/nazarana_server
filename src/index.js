const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
import cors from "cors";

const connectDB = require("./config/connectDB");
const apiRoutes = require("./routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true,
  }),
);

const PORT = process.env.PORT;

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
