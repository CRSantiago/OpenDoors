// server/routes/jobApplications.js
import express from "express"
import authenticateToken from "../middleware/authenticateToken.js"
import JobApplication from "../models/jobApplication.js"
import User from "../models/user.js"
const router = express.Router()

// POST /api/job-applications to create a new job application
router.post("/", async (req, res) => {
  try {
    const newJobApplication = new JobApplication(req.body)
    const savedJobApplication = await newJobApplication.save()
    const userId = req.body.user
    await User.findByIdAndUpdate(userId, {
      $push: { jobApplications: savedJobApplication._id },
    })
    res.status(201).send({ message: "Job application created successfully" })
  } catch (error) {
    console.log(error)
    res.status(400).send({ messaage: error })
  }
})

// GET /api/job-applications - Get all job applications for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId // Extracted from JWT
    const jobApplications = await JobApplication.find({ user: userId })
    res.json(jobApplications)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// GET /api/job-applications/:id - Get a single job application by ID
router.get("/:id", async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id)
    if (jobApplication) {
      res.status(200).json(jobApplication)
    } else {
      res.status(404).json({ message: "Job application not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/job-applications/:id - Update a job application by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedJobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedJobApplication)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// DELETE /api/job-applications/:id - Delete a job application by ID
router.delete("/:id", async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndDelete(req.params.id)
    if (jobApplication) {
      res.status(200).json({ message: "Job application deleted successfully" })
    } else {
      res.status(404).json({ message: "Job application not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
