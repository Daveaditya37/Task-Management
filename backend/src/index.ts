import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import allRouter from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://ethara-task-management.up.railway.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Express 5 requires (.*) instead of *
app.options("(.*)", cors());

app.use(express.json());

app.use("/api", allRouter);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;