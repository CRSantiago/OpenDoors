import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const mongoURI = process.env.MONGO_URI

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))
