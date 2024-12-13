import SibApiV3Sdk from "@sendinblue/client";
import dotenv from "dotenv";
dotenv.config();

export const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sender = { email: "esraa1920252023@gmail.com", name: "EhoPlay" };
