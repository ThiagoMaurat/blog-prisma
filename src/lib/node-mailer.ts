import nodemailer from "nodemailer";
import { env } from "../../env.mjs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  /* port: Number(process.env.EMAIL_PORT), */
  auth: {
    user: `${env.GMAIL_MAIL}`,
    pass: `${env.GMAIL_PASSWORD}`,
  },
});

export default transporter;
