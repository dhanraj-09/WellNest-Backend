import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

const addData = async () => {
  try {
    const user = await prisma.therapist.create({
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
  } catch (error) {
    console.log(error);
  }
};

addData();
