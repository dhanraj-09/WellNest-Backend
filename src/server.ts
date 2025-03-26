import express from "express";
import cors from "cors";
import therapistRoutes from "./therapistRoutes";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use("/therapist", therapistRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
