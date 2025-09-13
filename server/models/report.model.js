// server/models/report.model.js
import mongoose from 'mongoose';
//Imports Mongoose, which is used to define schemas and interact with MongoDB.

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    opinion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
/*
userId
Stores the ID of the user who submitted the report.
mongoose.Schema.Types.ObjectId → links to a MongoDB object ID.
ref: 'User' → references the User collection (so you can populate user details later).
required: true → must be provided.
opinion
Stores the user’s opinion or report content.
required: true → must be provided.
{ timestamps: true }
Automatically adds createdAt and updatedAt fields to track when the report was created or updated.
*/