import mongoose from "mongoose";
interface Forgot {
  email: string;
  token: string;
  createdAt?: string;
}

const ForgotSchema = new mongoose.Schema({
  email: { type: String, required: true, minLength: 5 },
  token: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});


let Forgot = mongoose.models.Forgot<Forgot> || mongoose.model("Forgot", ForgotSchema);

export { Forgot, ForgotSchema };
