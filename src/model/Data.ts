import mongoose, { mongo, Schema } from "mongoose";

const dataModel = new Schema({
  technicalNumber: {
    type: String,
    required: true,
  },
  nonTechnicalNumber: {
    type: String,
    required: true,
  },
  medicalMobileNumber: {
    type: String,
    required: true,
  },
});

const Data = mongoose.models.Data || mongoose.model("Data", dataModel);
export default Data;
