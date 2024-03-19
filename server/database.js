import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

// Determine the correct URI based on the environment
const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))
