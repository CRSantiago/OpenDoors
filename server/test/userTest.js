import server from "../index.js" // Import your Express app
import { expect } from "chai"
import User from "../models/user.js" // Adjust path as necessary
import supertest from "supertest"

const request = supertest(server)

describe("User Endpoints", () => {
  let token // To store the token for authenticated requests
  let userId

  // Clean up: Delete all users before each test to start with a fresh database
  before(async () => {
    await User.deleteMany({})
  })

  describe("POST /api/users/signup", () => {
    it("should register a new user", async () => {
      const userData = {
        username: "testUser",
        email: "test@example.com",
        password: "password123",
      }

      const response = await request.post("/api/users/signup").send(userData)

      expect(response.status).to.equal(201)
      expect(response.body).to.have.property(
        "message",
        "User created successfully"
      )
    })
  })

  describe("POST /api/users/signin", () => {
    it("should authenticate the user and return a token", async () => {
      const loginData = {
        username: "testUser",
        password: "password123",
      }

      const response = await request.post("/api/users/signin").send(loginData)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property("token")
      token = response.body.token // Save the token for later tests
      userId = response.body.userId
    })
  })

  describe("PUT /api/users/update", () => {
    it("should allow a user to update their username and email", async () => {
      const updateData = {
        username: "updatedUser",
        email: "updated@example.com",
      }

      const response = await request
        .put("/api/users/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)

      expect(response.status).to.equal(200)
    })
  })

  describe("DELETE /api/users/:id", () => {
    it("should delete the user account", async () => {
      const response = await request
        .delete(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property(
        "message",
        "User and their job applications deleted successfully"
      )
    })
  })
})
