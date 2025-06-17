import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async (request: Request, response: Response) => {
  const { email } = request.body;
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "baabarmx@gmail.com",
      pass: "yignruoqpvxgluyq",
    },
  });

  const options = {
    from: "baabarmx@gmail.com",
    to: "baabar_mx@yahoo.com",
    subject: "Hellooo",
    text: "testing",
  };

  await transport.sendMail(options);
};