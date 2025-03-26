"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const therapistRoutes_1 = __importDefault(require("./therapistRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
// Routes
app.use("/therapist", therapistRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
