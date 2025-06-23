import mongoose, { Schema } from "mongoose";

const SubmissionModelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
    enum: ["B.Tech", "BCA", "BCS", "Non-Tech"],
  },
  field: {
    type: String,
    enum: ["CSE", "IT", "ECE", "Mechanical", "Civil", "Electrical"],
    default: null,
  },
  passoutYear: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
    enum: ["Fresher", "0-1 Year", "1-2 Years", "2+ Years"],
  },
});

const Submission =
  mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionModelSchema);
export default Submission;
