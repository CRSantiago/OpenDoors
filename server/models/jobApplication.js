// server/models/jobApplication.js
import mongoose from "mongoose"

const jobApplicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    dateApplied: { type: Date, required: true },
    status: { type: String, required: true },
    source: { type: String, required: false },
  },
  { collection: "JobApplications" }
)

export default mongoose.model("JobApplication", jobApplicationSchema)
