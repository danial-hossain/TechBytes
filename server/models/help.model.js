import mongoose from "mongoose";
//Imports Mongoose, which helps us work with MongoDB in Node.js.

const HelpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

/*
Defines a schema (structure) for help requests:
email: String, must be provided.
message: String, must be provided.
createdAt: Date, defaults to current time when the help request is created
*/
export default mongoose.model("Help", HelpSchema);
