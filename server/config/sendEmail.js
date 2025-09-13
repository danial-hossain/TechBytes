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

import {sendEmail} from "./emailService.js";
//Brings in the function that actually sends emails from another file.
//email service er functionality gulo use krbo
/*
to → who you’re sending the email to
subject → email title
text → plain text version of the email
html → HTML version of the email
*/
const sendEmailFun = async ({ to, subject, text, html }) => {
    const result = await sendEmail(to, subject, text, html);
//Calls the sendEmail function to actually send the email.
//Waits for it to finish and stores the result (success or failure) in result

    if (result.success) {
//Checks if the email was sent successfully:
//If yes → return true
//If no → return false
        return true;
    } else {
        return false;
    }
};

export default sendEmailFun;