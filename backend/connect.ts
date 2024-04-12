import mongoose from "mongoose";

type ConnectionState={
  connectionReady: number
}
const connection:ConnectionState={}
const connectDb = async () : Promise<void> => {
    if(connection.connectionReady){
      console.log("Already connected database");
      return;
    }
  try{
    const db=await mongoose.connect(process.env.MONGO_URI || '', {});
    connection.connectionReady=db.connections[0].readyState;

    console.log("connected");
  }

  catch(error){
    console.log(error)
    process.exit(1);
  }
};

export default connectDb;
