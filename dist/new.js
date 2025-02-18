"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = require("cors");
const therapistRoutes_1 = __importDefault(require("./therapistRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ origin: true, credentials: true }));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
// Middleware
app.use(express_1.default.json());
app.use(cors({ origin: true, credentials: true }));
// Routes
app.use("/", therapistRoutes_1.default); // All therapist routes
app.use("/", userRoutes_1.default); // All user routes
const port = process.env.port || 3000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = router;
