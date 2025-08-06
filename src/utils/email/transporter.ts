import nodemailer, { Transporter } from 'nodemailer';

export function createTransporter(): Transporter {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "desarrollo.movil@inssoftmx.com",
      pass: "6wVcjd7W0kFyEHhp"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}