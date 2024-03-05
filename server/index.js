// server/index.js
import express from "express"
import helmet from "helmet"
import "./database.js"
import jobApplicationRoutes from "./routes/jobApplications.js"
import userRoutes from "./routes/users.js"

const app = express()
app.use(helmet())
const PORT = process.env.PORT || 3001

app.get("/", (req, res) => res.send("Hello World from OpenDoors Server!"))
app.use(express.json()) // Middleware to parse JSON bodies
app.use("/api/job-applications", jobApplicationRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

export default app
