import nodemailer from 'nodemailer';
import logger from './logger';

const createTransporter = async () => {
  // If SMTP details are provided in environment, use them
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Otherwise, fallback to Ethereal Email for development/testing
  logger.warn('No SMTP configuration found. Falling back to Ethereal Email for development.');
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: `"Savoria Support" <${process.env.SMTP_USER || 'no-reply@savoria.com'}>`,
      to,
      subject,
      html,
    });

    logger.info(`Email sent: ${info.messageId}`);
    
    // Log the preview URL for Ethereal Email if applicable
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      logger.info(`Preview URL: ${previewUrl}`);
    }
    
    return true;
  } catch (error) {
    logger.error(`Error sending email: ${error}`);
    return false;
  }
};
