import mongoose from "mongoose";
//mongoose: A popular Node.js library to interact with MongoDB in an easier and structured way
import dotenv from 'dotenv';
//dotenv: A package to load environment variables from a .env file into process.env.
dotenv.config();
//Loads variables from a .env file into process.env
//process.env.MONGODB_URI -> will have MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydb


if (!process.env.MONGODB_URI) {// this line is for checking connection
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    );
}
//This ensures that the MongoDB connection string exists.
//If not, it throws an error and stops the program.

async function connectDB() {//Defines an asynchronous function connectDB to connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.log("MongoDB connect error", error);
        process.exit(1);
    }
}

export default connectDB;