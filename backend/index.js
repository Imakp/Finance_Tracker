import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import monthRoutes from './routes/monthRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// Routes
app.use('/api/months', monthRoutes);
app.use('/api/months/:year/:month/transactions', transactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
