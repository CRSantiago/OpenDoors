// server/routes/jobApplications.js
import express from 'express'
import JobApplication from '../models/jobApplication.js'
const router = express.Router()

// Placeholder for the model
// const JobApplication = require('../models/jobApplication');

// POST /api/job-applications to create a new job application
router.post('/', async (req, res) => {
  try {
    // Placeholder for create logic
    const jobApplication = new JobApplication(req.body)
    await jobApplication.save()
    res.status(201).send({ message: 'Job application created successfully' })
  } catch (error) {
    res.status(400).send(error)
  }
})

// GET /api/job-applications - Get all job applications
router.get('/', async (req, res) => {
  try {
    const jobApplications = await JobApplication.find()
    res.status(200).json(jobApplications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/job-applications/:id - Get a single job application by ID
router.get('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id)
    if (jobApplication) {
      res.status(200).json(jobApplication)
    } else {
      res.status(404).json({ message: 'Job application not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/job-applications/:id - Update a job application by ID
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndDelete(req.params.id)
    if (jobApplication) {
      res.status(200).json({ message: 'Job application deleted successfully' })
    } else {
      res.status(404).json({ message: 'Job application not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
