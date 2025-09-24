import mongoose from "mongoose";

const essaySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  score: {
    type: Number, // out of 25
    default: 0,
  },
  feedback: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Essay = mongoose.model("Essay", essaySchema);
export default Essay;
