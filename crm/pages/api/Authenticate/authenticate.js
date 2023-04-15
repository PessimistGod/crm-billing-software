import Signup from "@/Models/signup";
import nodemailer from "nodemailer"
import connectDB from "@/Middleware/db";

connectDB();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { username, email, phone, password } = req.body;


        const existingSignup = await Signup.findOne({ email });
        if (existingSignup) {
          res.status(400).json({ message: "User already exists" });
          return;
        }


        const newSignup = new Signup({
          username,
          email,
          phone,
          password,
        });


        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpCodeExpiration = new Date(Date.now() + 5 * 60 * 1000);
        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: "OTP Verification",
          html: `
          <table role="presentation"
        style="width: 100%; border-collapse: collapse; border: 0px none; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif;">
        <tbody>
          <tr>
            <td style="padding: 1rem 2rem; vertical-align: top; width: 100%;" text-align="center">
              <table role="presentation"
                style="max-width: 600px; border-collapse: collapse; border: 0px none; border-spacing: 0px; text-align: left;">
                <tbody>
                  <tr>
                    <td style="padding: 40px 0px 0px;">
                    
                      <div style="padding: 20px; background-color: rgb(255, 255, 255); overflow-x: auto;">
                        <div style="color: rgb(0, 0, 0); text-align: left;">
                          <h1 style="margin: 1rem 0">Verification code</h1>
                          <p style="padding-bottom: 10px">Your OTP is valid only for 5 minutes. <br> Do not share this Otp</p>
                          <p style="padding-bottom: 16px"><strong style="font-size: 150%; font-weight: 600;">${otpCode}</strong></p>
                          <p style="padding-bottom: 10px"><a href='http://localhost:3000/Authenticate/verify?email=${email}'>Click here To Go to the Website</p>
                          <p></p>
                          
                          <p style="padding-bottom: 16px">If you didn't request this, you can ignore this email.</p>
                          <p style="padding-bottom: 16px">Thank You,<br>for choosing CRM Billing System</p>
                          </div>
                      </div>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
        `,
        };
        await transporter.sendMail(mailOptions);


        newSignup.otpCode = otpCode;
        newSignup.otpCodeExpiration = otpCodeExpiration;


        await newSignup.save();

        res.status(201).json(newSignup);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    case "PUT":
      try {
        const { email, otpCode } = req.body;



        const user = await Signup.findOne({ email });
        if (!user) {
          res.status(404).json({ message: "Signup not found" });
          return;
        }



        if (user.otpCode !== otpCode || user.otpCodeExpiration < Date.now()) {
          await Signup.deleteOne({ email });
          res.status(400).json({ message: "Invalid OTP Please Signup Again" });
          return;
        }


        res.status(200).json({ message: "OTP verified" });
        user.isVerified = true;
        await user.save();
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}