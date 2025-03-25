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
const prisma = new client_1.PrismaClient();
const mockTherapists = [
    {
        email: "yashsthapliyal05@gmail.com",
        password: "afsdl;jfas;23",
        name: "Yash Sanjeev Thapliyal",
        phoneNumber: 8130411584,
        languages: ["English", "French", "Hindi", "Haryanvi"],
    },
];
const seedTherapists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const therapist of mockTherapists) {
            yield prisma.therapist.create({
                data: {
                    email: therapist.email,
                    password: therapist.password,
                    name: therapist.name,
                    languages: {
                        create: therapist.languages.map((lang) => ({ name: lang })),
                    },
                },
            });
        }
        console.log("Mock therapist data added successfully.");
    }
    catch (error) {
        console.error("Error adding mock therapists:", error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
seedTherapists();
