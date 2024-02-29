// test/jobApplicationTests.js
import server from '../index.js' // Import your Express app
import { expect } from 'chai'
import JobApplication from '../models/jobApplication.js' // Adjust path as necessary
import supertest from 'supertest'

const request = supertest(server)

describe('Job Applications', () => {
  // Before each test, empty the database
  beforeEach(async () => {
    await JobApplication.deleteMany({})
  })

  // Test the POST endpoint
  describe('/POST job application', () => {
    it('it should POST a job application', async () => {
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
      })
      // Save the job application to the database
      const savedJobApplication = await jobApplication.save()

      // Now, make the PUT request
      const response = await request
        .put('/api/job-applications/' + savedJobApplication._id)
        .send({ company: 'Updated Company', status: 'Interviewed' })

      // Verify the response
      expect(response.status).to.equal(200)
      // Verify the body with updated values
      expect(response.body).to.have.property('company').eql('Updated Company')
      expect(response.body).to.have.property('status').eql('Interviewed')
    })
  })

  // Test the GET ALL endpoint
  describe('/GET job applications', () => {
    it('it should GET all the job applications', async () => {
      // get all job applications
      const response = await request.get('/api/job-applications')
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
      })
      const savedJobApplication = await jobApplication.save() // Save the job application to the database

      // Now, make the GET request
      const response = await request.get(
        '/api/job-applications/' + savedJobApplication._id
      )
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
      })
      const savedJobApplication = await jobApplication.save() // Save the job application to the database

      // Now, make the DELETE request
      const response = await request.delete(
        '/api/job-applications/' + savedJobApplication._id
      )
      // Verify the response
      expect(response.status).to.equal(200)
      // Verify the message
      expect(response.body)
        .to.have.property('message')
        .eql('Job application deleted successfully')

      // Optionally, verify deletion
      const fetchDeleted = await request.get(
        '/api/job-applications/' + savedJobApplication._id
      )
      // Verify the response
      expect(fetchDeleted.status).to.equal(404)
    })
  })
})
