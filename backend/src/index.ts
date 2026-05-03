import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import allRouter from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", allRouter);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
