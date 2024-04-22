import server from "../app.js"
import mongoose from "mongoose"
import { expect } from "chai"
import User from "../models/user.js"
import supertest from "supertest"
import dotenv from "dotenv"
dotenv.config()

const request = supertest(server)
console.log("process.env.MONGO_URI_TEST", process.env.MONGO_URI_TEST)
describe("User Endpoints", () => {
  let token // To store the token for authenticated requests
  let userId

  // Clean up: Delete all users before each test to start with a fresh database
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST)
    await User.deleteMany({})
  })

  describe("POST /api/users/signup", () => {
    it("should register a new user", async () => {
      const userData = {
        username: "testUser",
        email: "test@example.com",
        password: "ValidPassword123!",
      }

      const response = await request.post("/api/users/signup").send(userData)

      expect(response.status).to.equal(201)
      expect(response.body).to.have.property(
        "message",
        "User created successfully"
      )
    })
  })

  describe("POST /api/users/signup", () => {
    it("should return 400, invalid email", async () => {
      const userData = {
        username: "testUser",
        email: "test@example",
        password: "ValidPassword123!",
      }

      const response = await request.post("/api/users/signup").send(userData)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property("message", "Invalid email format.")
    })
  })

  describe("POST /api/users/signup", () => {
    it("should return 400, password does not meet strength", async () => {
      const userData = {
        username: "testUser",
        email: "test@example.com",
        password: "invalidpass",
      }

      const response = await request.post("/api/users/signup").send(userData)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property(
        "message",
        "Password does not meet strength requirements."
      )
    })
  })

  describe("POST /api/users/signup", () => {
    it("should return 400, invalid username", async () => {
      const userData = {
        username: "testUser@!11",
        email: "test@example.com",
        password: "ValidPassword123!",
      }

      const response = await request.post("/api/users/signup").send(userData)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property(
        "message",
        "Invalid username format."
      )
    })
  })

  describe("POST /api/users/signin", () => {
    it("should authenticate the user and return a token", async () => {
      const loginData = {
        username: "testUser",
        password: "ValidPassword123!",
      }

      const response = await request.post("/api/users/signin").send(loginData)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property("token")
      token = response.body.token // Save the token for later tests
      userId = response.body.userId
    })
  })

  describe("POST /api/users/signin", () => {
    it("should return user does not exist", async () => {
      const loginData = {
        username: "wrongtTestUser",
        password: "ValidPassword123!",
      }

      const response = await request.post("/api/users/signin").send(loginData)

      expect(response.status).to.equal(401)
      expect(response.body).to.have.property(
        "message",
        "Authentication failed. User does not exist."
      )
    })
  })

  describe("POST /api/users/signin", () => {
    it("should return invalid password", async () => {
      const loginData = {
        username: "testUser",
        password: "WrongPassword123!",
      }

      const response = await request.post("/api/users/signin").send(loginData)

      expect(response.status).to.equal(401)
      expect(response.body).to.have.property(
        "message",
        "Authentication failed. Invalid password."
      )
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

  describe("PUT /api/users/update", () => {
    it("should return 400. Invalid updated email", async () => {
      const updateData = {
        username: "updatedUser",
        email: "updated@example",
      }

      const response = await request
        .put("/api/users/update")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)

      expect(response.status).to.equal(400)
    })
  })

  describe("POST /api/users/change-password", () => {
    it("should return 400, invalid current password", async () => {
      const passwordData = {
        currentPassword: "NotCurrPassword123!",
        newPassword: "NewPassword123!",
      }

      const response = await request
        .post("/api/users/change-password")
        .set("Authorization", `Bearer ${token}`)
        .send(passwordData)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property(
        "message",
        "Current password is incorrect."
      )
    })
  })

  describe("POST /api/users/change-password", () => {
    it("should return 400, invalid new password", async () => {
      const passwordData = {
        currentPassword: "ValidPassword123!",
        newPassword: "invalidpass",
      }

      const response = await request
        .post("/api/users/change-password")
        .set("Authorization", `Bearer ${token}`)
        .send(passwordData)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property(
        "message",
        "Password does not meet strength requirements."
      )
    })
  })

  describe("POST /api/users/change-password", () => {
    it("should allow a user to change their password", async () => {
      const passwordData = {
        currentPassword: "ValidPassword123!",
        newPassword: "NewPassword123!",
      }

      const response = await request
        .post("/api/users/change-password")
        .set("Authorization", `Bearer ${token}`)
        .send(passwordData)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property(
        "message",
        "Password successfully updated."
      )
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

  describe("DELETE /api/users/:id", () => {
    it("should return 403. Unauthorized user.", async () => {
      const response = await request
        .delete(`/api/users/12345565`)
        .set("Authorization", `Bearer ${token}`)

      expect(response.status).to.equal(403)
      expect(response.body).to.have.property(
        "message",
        "Unauthorized to delete this user"
      )
    })
  })
})
