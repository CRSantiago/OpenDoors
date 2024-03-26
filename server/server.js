import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config()

// Determine the correct URI based on the environment
const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI

const PORT = process.env.PORT || 3001

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  })
  .catch((err) => console.log(err))
