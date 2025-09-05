import { Router } from "express";
const router = Router();
import dotenv from "dotenv"
dotenv.config();
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

router.post("/email", async (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const message = req.body.message;
  if(!fullName || !email || !message){
    res.json({
        working:false,
        message:"incomplete details"
    })
  }
  try {
    await resend.emails.send({
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
  } catch (error) {
    console.log(error);
    res.json({
      working: false,
      error: error,
    });
  }
});

export default router;
