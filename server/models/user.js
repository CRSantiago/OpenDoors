import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Consider hashing before storing
    jobApplications: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' },
    ],
  },
  { collection: 'Users' },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
