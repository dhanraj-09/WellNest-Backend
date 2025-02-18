import express from "express";
var cors = require("cors");
import therapistRoutes from "./therapistRoutes";
import userRoutes from "./userRoutes";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
const router = express.Router();


// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use("/", therapistRoutes);
app.use("/", userRoutes); 

const port = process.env.port || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default router;