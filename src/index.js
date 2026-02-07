const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/connectDB");

const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
