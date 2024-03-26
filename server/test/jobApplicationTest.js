// test/jobApplicationTests.js
import server from '../app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { expect } from 'chai'
import JobApplication from '../models/jobApplication.js'
import supertest from 'supertest'

dotenv.config()
const request = supertest(server)

describe('Job Applications', () => {
  let token
  let userId

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST)
    // Create a test user
    await request.post('/api/users/signup').send({
      username: 'testUser',
      password: 'ValidPassword123!',
      email: 'test@mail.com',
    })

    // Authenticate the test user
    const authResponse = await request.post('/api/users/signin').send({
      username: 'testUser',
      password: 'ValidPassword123!',
    })

    token = authResponse.body.token
    userId = authResponse.body.userId
  })

  // Before each test, empty the database
  beforeEach(async () => {
    if (userId) {
      await JobApplication.deleteMany({ user: userId })
    }
  })

  after(async () => {
    // Clean up: delete the test user and their job applications
    await request
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
  })

  // Test the POST endpoint
  describe('/POST job application', () => {
    it('it should POST a job application with only required fields', async () => {
      // Create a new job application
      let jobApplication = {
        company: 'Test Company',
        jobTitle: 'Test Title',
        dateApplied: '2021-01-01',
        status: 'Applied',
      }
      // Make the POST request
      const response = await request
        .post('/api/job-applications')
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
        .send(jobApplication)

      // Verify the response
      expect(response.status).to.equal(201)
      // Verify the body
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal(
        'Job application created successfully'
      )
    })
  })

  // Test the POST endpoint
  describe('/POST job application', () => {
    it('it should POST a job application with required fields and optional', async () => {
      // Create a new job application
      let jobApplication = {
        company: 'Test Company',
        jobTitle: 'Test Title',
        dateApplied: '2021-01-01',
        status: 'Applied',
        source: 'Indeed',
        location: 'Remote',
      }
      // Make the POST request
      const response = await request
        .post('/api/job-applications')
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
        .send(jobApplication)

      // Verify the response
      expect(response.status).to.equal(201)
      // Verify the body
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal(
        'Job application created successfully'
      )
    })
  })

  // Test the PUT endpoint
  describe('/PUT/:id job application', () => {
    it('it should UPDATE a job application given the id', async () => {
      // Create a new job application
      const jobApplication = new JobApplication({
        company: 'Test Company',
        jobTitle: 'Test Title',
        dateApplied: '2021-01-01',
        status: 'Applied',
        user: userId,
      })
      // Save the job application to the database
      const savedJobApplication = await jobApplication.save()

      // Now, make the PUT request
      const response = await request
        .put('/api/job-applications/' + savedJobApplication._id)
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
        .send({ company: 'Updated Company', status: 'Interviewed' })

      // Verify the response
      expect(response.status).to.equal(200)

      // Verify the body with updated values
      expect(response.body)
        .to.have.property('message')
        .eql('Job application updated successfully')
      expect(response.body.jobApplication)
        .to.have.property('company')
        .eql('Updated Company')
      expect(response.body.jobApplication)
        .to.have.property('status')
        .eql('Interviewed')
    })
  })

  // Test the PUT endpoint
  describe('/PUT/:id job application', () => {
    it('it should UPDATE a job application given the id with optional fields', async () => {
      // Create a new job application
      const jobApplication = new JobApplication({
        company: 'Test Company',
        jobTitle: 'Test Title',
        dateApplied: '2021-01-01',
        status: 'Applied',
        user: userId,
      })
      // Save the job application to the database
      const savedJobApplication = await jobApplication.save()

      // Now, make the PUT request
      const response = await request
        .put('/api/job-applications/' + savedJobApplication._id)
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
        .send({
          company: 'Updated Company',
          status: 'Interviewed',
          source: 'Indeed',
          location: 'Remote',
        })

      // Verify the response
      expect(response.status).to.equal(200)

      // Verify the body with updated values
      expect(response.body)
        .to.have.property('message')
        .eql('Job application updated successfully')
      expect(response.body.jobApplication)
        .to.have.property('company')
        .eql('Updated Company')
      expect(response.body.jobApplication)
        .to.have.property('status')
        .eql('Interviewed')
      expect(response.body.jobApplication)
        .to.have.property('source')
        .eql('Indeed')
      expect(response.body.jobApplication)
        .to.have.property('location')
        .eql('Remote')
    })
  })

  // Test the GET ALL endpoint
  describe('/GET job applications', () => {
    it('it should GET all the job applications', async () => {
      // get all job applications
      const response = await request
        .get('/api/job-applications')
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
      // Verify the response
      expect(response.status).to.equal(200)
      // Verify the body
      expect(response.body).to.be.an('array')
    })
  })

  // Test the GET by ID endpoint
  describe('/GET/:id job application', () => {
    it('it should GET a job application by the given id', async () => {
      // Create a new job application
      const jobApplication = new JobApplication({
        company: 'Test Company',
        jobTitle: 'Test Title',
        dateApplied: '2021-01-01',
        status: 'Applied',
        user: userId,
      })
      const savedJobApplication = await jobApplication.save() // Save the job application to the database

      // Now, make the GET request
      const response = await request
        .get('/api/job-applications/' + savedJobApplication._id)
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
      // Verify the response
      expect(response.status).to.equal(200)
      // Verify the ID
      expect(response.body)
        .to.have.property('_id')
        .eql(savedJobApplication._id.toString())
    })
  })

  // Test the DELETE endpoint
  describe('/DELETE/:id job application', () => {
    it('it should DELETE a job application given the id', async () => {
      const jobApplication = new JobApplication({
        company: 'Test Company',
        jobTitle: 'Test Title',
        dateApplied: '2021-01-01',
        status: 'Applied',
        user: userId,
      })
      const savedJobApplication = await jobApplication.save() // Save the job application to the database

      // Now, make the DELETE request
      const response = await request
        .delete('/api/job-applications/' + savedJobApplication._id)
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
      // Verify the response
      expect(response.status).to.equal(200)
      // Verify the message
      expect(response.body)
        .to.have.property('message')
        .eql('Job application deleted successfully')

      // Optionally, verify deletion
      const fetchDeleted = await request
        .get('/api/job-applications/' + savedJobApplication._id)
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header
      // Verify the response
      expect(fetchDeleted.status).to.equal(404)
    })
  })
})
