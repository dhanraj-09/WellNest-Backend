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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/therapist/appointments", (req, res) => {
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
//get all therapists users
router.get("/therapists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const therapists = yield prisma.therapist.findMany({
            include: {
                languages: true
            },
        });
        res.json(therapists);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
