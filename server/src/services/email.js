const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is not configured.");
  }

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    replyTo: process.env.EMAIL_REPLY_TO || undefined,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message || "Unable to send email.");
  }

  return data;
}

module.exports = {
  sendEmail,
};