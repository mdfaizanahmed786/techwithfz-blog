import mongoose from "mongoose";

const ForgotSchema = new mongoose.Schema({
  email: { type: String, required: true, minLength: 5 },
  token: { type: String, required:true },
 
});

// we are using this below syntax because next js already complies it on the fly and tries to re-compile it which throws an error because it has already created it once.
let Forgot= mongoose.models.Blog || mongoose.model("Forgot", ForgotSchema) 


export {Forgot, ForgotSchema};