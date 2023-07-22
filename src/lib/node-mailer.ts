import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  /* port: Number(process.env.EMAIL_PORT), */
  auth: {
    user: `${process.env.GMAIL_MAIL}`,
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
});

export default transporter;
