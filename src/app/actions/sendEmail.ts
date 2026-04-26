"use server";

import nodemailer from "nodemailer";

interface ContactData {
  name: string;
  email: string;
  mobile: string;
  scope: string;
  budget: string;
}

export async function sendEmail(data: ContactData) {
  try {
    const { name, email, mobile, scope, budget } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anilsen3095@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const htmlTemplate = `
      <div style="font-family: 'Courier New', Courier, monospace; background-color: #0A0A0A; color: #EAEAEA; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #333333;">
        <h2 style="color: #E4FF00; margin-top: 0; font-size: 20px;">> New Deployment Request</h2>
        <div style="height: 1px; background-color: #333333; margin: 20px 0;"></div>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; width: 100px;"><span style="color: #00FF41;">> name_</span></td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><span style="color: #00FF41;">> email_</span></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #EAEAEA; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><span style="color: #00FF41;">> mobile_</span></td>
            <td style="padding: 8px 0;">${mobile}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><span style="color: #00FF41;">> budget_</span></td>
            <td style="padding: 8px 0;">${budget || 'Not specified'}</td>
          </tr>
        </table>

        <br/>
        <div style="margin-top: 10px;">
          <p style="color: #00FF41; margin-bottom: 10px;">> project_scope_</p>
          <div style="background-color: #111111; padding: 15px; border: 1px solid #222222; border-radius: 4px; white-space: pre-wrap; line-height: 1.5;">${scope}</div>
        </div>

        <div style="height: 1px; background-color: #333333; margin: 25px 0;"></div>
        <p style="color: #555555; font-size: 12px; margin: 0;">System generated transmission from Portfolio Terminal.</p>
      </div>
    `;

    const mailOptions = {
      from: `Portfolio Terminal <anilsen3095@gmail.com>`,
      to: "anilsen3095@gmail.com",
      replyTo: email,
      subject: `[New Lead] ${name} - Project Inquiry`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to transmit message." };
  }
}
