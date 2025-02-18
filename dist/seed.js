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
// const data = {
//     email : "rushilmisra@gmail.com",
//     password :"hin",
//     fullname : "mohit",
//     phoneNumber : 999999999,
// }
const data = {
    email: "therapist@gmail.com",
    password: "asdf",
    fullname: "thera pist",
    phoneNumber: 99999123,
};
const addData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.therapist.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.fullname,
                languages: {
                    create: [
                        {
                            name: "Hindi",
                        },
                        {
                            name: "English",
                        },
                    ],
                },
            },
        });
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
addData();
