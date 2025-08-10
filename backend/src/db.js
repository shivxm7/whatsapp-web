import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DB: ${mongoose.connection.name}`);
  } catch (err) {
    console.log("Mongoose connection error:", err);
  }
};

export default connectDb;
