import http from 'http';
import nodemailer from 'nodemailer';
//Imports nodemailer, a Node.js package to send emails via SMTP.

// Configure the SMTP transporter

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // → Gmail’s email server.
    port: 465, // → secure connection port.->sometimes spam e pathay mail
    secure: true, // true for port 465, false for other ports,uses SSL for security.
    auth: { //your Gmail login
        user: process.env.EMAIL, // your SMTP username,amr gmail id
        pass: process.env.EMAIL_PASS // your SMTP password,amr gmail pass
    },
});
//This creates a mail transporter to send emails from your Gmail account.”
// Function to send email


async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address,amr id
            to, // list of receivers,to → recipient email
            subject, // Subject line,subject → email subject
            text, // plain text body,text → plain text version of email
            html, // html body,html → HTML version of email
        });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

export {sendEmail};