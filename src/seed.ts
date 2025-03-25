import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockTherapists = [
  {
    email: "yashsthapliyal05@gmail.com",
    password: "afsdl;jfas;23",
    name: "Yash Sanjeev Thapliyal",
    phoneNumber: 8130411584,
    languages: ["English", "French", "Hindi","Haryanvi"],
  },
  
];

const seedTherapists = async () => {
  try {
    for (const therapist of mockTherapists) {
      await prisma.therapist.create({
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
  } catch (error) {
    console.error("Error adding mock therapists:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedTherapists();
