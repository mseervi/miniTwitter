import nodemailer from "nodemailer";
import config from "../config/config.js";
import { handleErrors } from "./errorHandler.js";

export const nodemailerVerifyEmail = async (userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: config.MYEMAIL,
          pass: config.MYPASSWORD
      }
    });

    const otp = Math.floor(Math.random() * 1000000);

    var mailOptions = {
      from: '"mini Twitter 🎞️" <admin@minitwitter.com>',
      to: userEmail,
      subject: 'Sending Email with Nodemailer',
      text: `OTP: ${otp}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return otp;
  } catch (error) {
    return handleErrors(error);
  }
}


