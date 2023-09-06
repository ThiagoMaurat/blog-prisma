"use server";
import { SendMailOptions } from "nodemailer";
import { prisma } from "@/lib/prisma";
import transporter from "@/lib/node-mailer";

export const sendEmailConfirmation = async (email: string, html: any) => {
  try {
    const options = {
      from: `${process.env.GMAIL_MAIL}`,
      to: `${email}`,
      subject: `Confirmação de e-mail`,
      html: `${html}`,
    } as SendMailOptions;

    await transporter.sendMail(options);
  } catch (error) {
    throw new Error("Erro ao enviar e-mail de confirmação");
  }
};

export const saveRandomNumberOnDB = async (random: string, email: string) => {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        emailCodeVerified: String(random),
      },
    });
  } catch (error) {
    throw new Error("Erro ao criar conta");
  }
};
