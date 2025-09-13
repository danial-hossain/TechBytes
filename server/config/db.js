
import mongoose from "mongoose";
//Imports Mongoose, which is used to connect to MongoDB and define schemas/model

//Defines an async function named connectDb.
//async allows us to use await inside it.
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      //mongoose.connect(...) → Connects to MongoDB using the URL from process.env.MONGO_URL
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDb;