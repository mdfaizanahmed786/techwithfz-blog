import mongoose from "mongoose";


const connectDb = async () => {
  mongoose.connect(process.env.MONGO_URI as string)
};

export default connectDb;
