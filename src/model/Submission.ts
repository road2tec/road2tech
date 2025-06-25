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
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  field: {
    type: String,
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
  },
});

const Submission =
  mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionModelSchema);
export default Submission;
