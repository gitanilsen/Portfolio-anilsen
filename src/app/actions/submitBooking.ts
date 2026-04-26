"use server";

import nodemailer from "nodemailer";

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  topic: string;
  notes: string;
  guests: string;
}

export async function submitBooking(data: BookingData) {
  try {
    const { date, time, name, email, topic, notes, guests } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anilsen3095@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const htmlTemplate = `
      <div style="font-family: 'Courier New', Courier, monospace; background-color: #0A0A0A; color: #EAEAEA; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #333333;">
        <h2 style="color: #E4FF00; margin-top: 0; font-size: 20px;">> New Meeting Scheduled</h2>
        <div style="height: 1px; background-color: #333333; margin: 20px 0;"></div>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; width: 120px;"><span style="color: #00BA2F;">> Date_</span></td>
            <td style="padding: 8px 0; font-weight: bold;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><span style="color: #00BA2F;">> Time_</span></td>
            <td style="padding: 8px 0; font-weight: bold;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><span style="color: #00BA2F;">> Name_</span></td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><span style="color: #00BA2F;">> Email_</span></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #EAEAEA; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><span style="color: #00BA2F;">> Guests_</span></td>
            <td style="padding: 8px 0;">${guests || 'None'}</td>
          </tr>
        </table>

        <br/>
        <div style="margin-top: 10px;">
          <p style="color: #00BA2F; margin-bottom: 10px;">> Topic_</p>
          <div style="background-color: #111111; padding: 15px; border: 1px solid #222222; border-radius: 4px; white-space: pre-wrap; line-height: 1.5;">${topic}</div>
        </div>

        ${notes ? `
        <div style="margin-top: 20px;">
          <p style="color: #00BA2F; margin-bottom: 10px;">> Additional_Notes_</p>
          <div style="background-color: #111111; padding: 15px; border: 1px solid #222222; border-radius: 4px; white-space: pre-wrap; line-height: 1.5; color: #888888;">${notes}</div>
        </div>
        ` : ''}

        <div style="height: 1px; background-color: #333333; margin: 25px 0;"></div>
        <p style="color: #555555; font-size: 12px; margin: 0;">System generated meeting request from Portfolio Terminal.</p>
      </div>
    `;

    const mailOptions = {
      from: `Portfolio Booking <anilsen3095@gmail.com>`,
      to: "anilsen3095@gmail.com",
      replyTo: email,
      subject: `[Meeting Booked] ${name} - ${date} at ${time}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending booking email:", error);
    return { success: false, error: "Failed to submit booking." };
  }
}
