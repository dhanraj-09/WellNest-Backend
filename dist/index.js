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
                expiresIn: "24h",
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
app.get("/allusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({});
        const newUsers = users.map((user) => (Object.assign(Object.assign({}, user), { phoneNumber: user.phoneNumber.toString() })));
        res.json(newUsers).status(200);
    }
    catch (err) {
        console.error(err);
        res
            .json({
            message: "Error fetching users",
        })
            .status(500);
    }
}));
app.get("/alltherapists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const therapists = yield prisma.therapist.findMany({
            include: {
                languages: true
            }
        });
        res.json(therapists);
    }
    catch (err) {
        console.log(err);
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
app.post("/therapist/appointments", (req, res) => {
    const dates = [
        "2022-03-15T09:24:38.123Z",
        "2023-07-21T14:57:12.789Z",
        "2020-11-03T22:45:59.456Z",
        "2021-06-12T18:30:25.674Z",
        "2024-01-08T07:12:48.345Z",
        "2020-05-19T03:18:14.932Z",
        "2022-09-27T11:42:06.110Z",
        "2023-04-05T15:20:33.221Z",
        "2021-12-31T23:59:59.999Z",
        "2024-10-14T01:05:17.678Z",
    ];
    const giventimes = [
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
    ];
    const { date, time } = req.body;
    console.log("got request");
    try {
        if (dates.includes(date) && giventimes.includes(time)) {
            res.json({ message: "Date and time exists" });
            console.log("date and time exists");
        }
        else {
            res.json({ message: "Date and time does not exist" });
            console.log("date and time does not exist");
        }
    }
    catch (err) {
        console.log(err);
        res.json({ message: "Error" });
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
