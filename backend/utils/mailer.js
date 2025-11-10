import nodemailer from "nodemailer";
export const createTransporter = () => {
  const user = process.env.ADMIN_EMAIL || "";
  const pass = process.env.ADMIN_EMAIL_APP_PASSWORD || "";
  if(!user || !pass){ console.warn("[mailer] Email credentials missing. Skipping email."); return null; }
  return nodemailer.createTransport({ service:"gmail", auth:{ user, pass } });
};
export const sendReplyEmail = async ({ to, productName, title, reply }) => {
  const transporter = createTransporter();
  if(!transporter) return;
  const info = await transporter.sendMail({
    from: `"Feedback Admin" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject: `Reply on your feedback for ${productName}`,
    html: `<p>Your feedback "<b>${title}</b>" received a reply:</p><p><b>${reply}</b></p>`
  });
  console.log("[mailer] Sent:", info.messageId);
};
