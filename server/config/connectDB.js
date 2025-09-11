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

import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    );
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.log("MongoDB connect error", error);
        process.exit(1);
    }
}

export default connectDB;