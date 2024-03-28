require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/catRoutes");
const { authenticateToken } = require("./middlewares/authMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/my_own_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/auth", authRoutes);
app.use("/tasks", authenticateToken, taskRoutes);
app.use("/categories", authenticateToken, categoryRoutes);

app.use(errorHandlerMiddleware);

process.on("unhandledRejection", (error) => {
  console.error(`Unhandled rejection: ${error.message}`, error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
