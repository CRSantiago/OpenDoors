// server/routes/jobApplications.js
import express from "express"
import authenticateToken from "../middleware/authenticateToken.js"
import JobApplication from "../models/jobApplication.js"
import User from "../models/user.js"
const router = express.Router()

// POST /api/job-applications to create a new job application
router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId // Extracted from JWT in authenticateToken middleware

    // Create a new job application with user ID from the authenticated user
    const newJobApplication = new JobApplication({
      ...req.body,
      user: userId, // Assign the authenticated user's ID to the job application
    })

    const savedJobApplication = await newJobApplication.save()

    // Update the User document to include the new job application ID in their jobApplications array
    await User.findByIdAndUpdate(userId, {
      $push: { jobApplications: savedJobApplication._id },
    })

    res.status(201).send({
      message: "Job application created successfully",
      jobApplication: savedJobApplication,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Error creating job application" })
  }
})

// GET /api/job-applications - Get all job applications for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId // Extracted from JWT
    const jobApplications = await JobApplication.find({ user: userId }).sort({
      dateApplied: -1,
    })
    res.json(jobApplications)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// GET /api/job-applications/:id - Get a single job application by ID for the authenticated user
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId // Extracted from JWT

    const jobApplication = await JobApplication.findOne({
      _id: id,
      user: userId,
    })
    if (!jobApplication) {
      return res
        .status(404)
        .send({ message: "Job application not found or access denied" })
    }

    res.json(jobApplication)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// PUT /api/job-applications/:id - Update a job application by ID for the authenticated user
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId // Extracted from JWT

    const jobApplication = await JobApplication.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      { new: true }
    )
    if (!jobApplication) {
      return res
        .status(404)
        .send({ message: "Job application not found or access denied" })
    }

    res.json({
      message: "Job application updated successfully",
      jobApplication,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// DELETE /api/job-applications/:id - Delete a job application by ID for the authenticated user
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId // Extracted from JWT

    const jobApplication = await JobApplication.findOneAndDelete({
      _id: id,
      user: userId,
    })
    if (!jobApplication) {
      return res
        .status(404)
        .send({ message: "Job application not found or access denied" })
    }

    res.json({ message: "Job application deleted successfully" })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default router
