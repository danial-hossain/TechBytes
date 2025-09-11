// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import http from 'http';
import nodemailer from 'nodemailer';

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., 'smtp.gmail.com' for Gmail
    port: 465, // or 465 for secure
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL, // your SMTP username
        pass: process.env.EMAIL_PASS // your SMTP password
    },
});

// Function to send email
async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

export {sendEmail};