import nodemailer, { type Transporter } from "nodemailer";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

let transporter: Transporter | undefined;

function getSmtpConfig(): SmtpConfig {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const port = Number(SMTP_PORT);
  const secureValue = process.env.SMTP_SECURE?.toLowerCase();

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_PORT) {
    throw new Error("SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS are required");
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }

  if (secureValue && secureValue !== "true" && secureValue !== "false") {
    throw new Error("SMTP_SECURE must be true or false");
  }

  return {
    host: SMTP_HOST,
    port,
    secure: secureValue ? secureValue === "true" : port === 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: process.env.SMTP_FROM || SMTP_USER,
  };
}

export function validatePasswordResetEmailConfig(): void {
  const config = getSmtpConfig();
  const frontendUrl = process.env.FRONTEND_URL;

  if (!frontendUrl) {
    throw new Error("FRONTEND_URL is required to send password reset links");
  }

  const parsedUrl = new URL(frontendUrl);
  const isLocalHttp =
    parsedUrl.protocol === "http:" &&
    (parsedUrl.hostname === "localhost" || parsedUrl.hostname === "127.0.0.1");

  if (parsedUrl.protocol !== "https:" && !isLocalHttp) {
    throw new Error("FRONTEND_URL must use HTTPS outside local development");
  }

  if (!config.from) {
    throw new Error("SMTP_FROM or SMTP_USER is required");
  }
}

export function createPasswordResetUrl(token: string): string {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    throw new Error("FRONTEND_URL is required to send password reset links");
  }

  const resetUrl = new URL("/reset-password", frontendUrl);
  resetUrl.searchParams.set("token", token);
  return resetUrl.toString();
}

export async function sendPasswordResetEmail(
  email: string,
  fullName: string,
  resetUrl: string
): Promise<void> {
  const config = getSmtpConfig();

  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  await transporter.sendMail({
    from: config.from,
    to: email,
    subject: "Reset your password",
    text: [
      `Hello ${fullName},`,
      "",
      "We received a request to reset your password.",
      `Use this one-time link within 60 minutes: ${resetUrl}`,
      "",
      "If you did not request this, you can ignore this email.",
    ].join("\n"),
  });
}
