import mongoose from "mongoose";
const surveySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_question: String,
  second_question: {
    looks: Number,
    price: Number,
    comfort: Number,
  },
});
const Survey = mongoose.models.Survey || mongoose.model("Survey", surveySchema);

export default Survey;
