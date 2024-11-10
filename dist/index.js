"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.therapist.findMany({});
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const user = yield prisma.therapist.findUnique({
            where: {
                id: String(id),
            },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
}));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (user) {
            res
                .json({
                error: "User already exists, try logging in",
            })
                .status(500);
        }
        if (!user) {
            try {
                const user = yield prisma.user.create({
                    data: {
                        name,
                        email: email.toLowerCase(),
                        phoneNumber,
                        password,
                    },
                });
                if (user) {
                    console.log("User created");
                    res
                        .json({
                        message: "user created",
                        userId: user.id,
                    })
                        .status(201);
                }
                else {
                    res
                        .json({
                        error: "Error creating user",
                    })
                        .status(500);
                }
            }
            catch (err) {
                console.log(err);
                res
                    .json({
                    error: "Error creating user",
                })
                    .status(500);
            }
        }
    }
    catch (err) {
        console.error(err);
        res
            .json({
            error: "Error checking user",
        })
            .status(500);
    }
}));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
app.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (user && user.password === password) {
            console.log("Login successful");
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({
                message: "Login successful",
                token: token,
                userId: user.id,
            });
        }
        else {
            console.log("Incorrect password");
            res.json({
                message: "Incorrect password",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.json({
            message: "User not found",
        });
    }
}));
app.get("/user/validate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ valid: false, message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = yield prisma.user.findFirst({
            where: {
                id: decoded.userID,
            },
        });
        if (!user) {
            console.log("Invalid token not user found");
            return res.status(401).json({ valid: false, message: "Invalid token" });
        }
        else {
            return res.json({ valid: true, userId: user.id });
        }
    }
    catch (err) {
        console.log("Invalid token");
        console.log(err);
        return res.status(401).json({ valid: false, message: "Invalid token" });
    }
}));
app.get("/user/name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                id: String(id),
            },
        });
        if (user) {
            res.json({
                name: user.name,
            });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching user" });
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
