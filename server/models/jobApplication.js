// server/models/jobApplication.js
import mongoose from 'mongoose'

const jobApplicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    dateApplied: { type: Date, required: true },
    status: { type: String, required: true },
    source: { type: String, required: false },
    location: { type: String, required: false },
    notes: { type: String, required: false },
    contactEmail: { type: String, required: false },
    contactPhone: { type: String, required: false },
    interviewDates: [{ type: Date, required: false }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { collection: 'JobApplications' }
)

export default mongoose.model('JobApplication', jobApplicationSchema)
