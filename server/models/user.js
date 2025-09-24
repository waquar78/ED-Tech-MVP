import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mastery: [
    {
      contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
      score: Number, 
      attempts: Number,
    },
  ],
  recommendedNext: [
    {
      contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
