import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
  text: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

export default mongoose.model("Joke", jokeSchema);
