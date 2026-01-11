const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const uploadRoutes = require("./routes/upload.routes");
const queryRoutes = require("./routes/query.routes");
const messageRoutes = require("./routes/message.routes");

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://consensus-xisa.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/upload", uploadRoutes);
app.use("/query", queryRoutes);
app.use("/messages", messageRoutes);

// DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
