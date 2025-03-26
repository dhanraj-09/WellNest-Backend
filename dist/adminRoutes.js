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
const express_1 = require("express");
const router = (0, express_1.Router)();
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
router.post("/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const message = req.body.message;
    if (!fullName || !email || !message) {
        res.json({
            working: false,
            message: "incomplete details"
        });
    }
    try {
        yield resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["mohithingorani2003@gmail.com"],
            subject: "WellNest Contact Form",
            html: `<div>from: ${fullName}</div>
            <div>email: ${email} </div>
            <div>message: ${message}</div>`,
        });
        res.json({
            working: true,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            working: false,
            error: error,
        });
    }
}));
exports.default = router;
