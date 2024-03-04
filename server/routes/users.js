//
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import JobApplication from "../models/jobApplication.js"
import validateUserInput from "../middleware/validateUserInput.js"
import authenticateToken from "../middleware/authenticateToken.js"

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

// POST /users/signup - User sign-up
router.post("/signup", validateUserInput, async (req, res) => {
  try {
    const { username, password, email } = req.body

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      username,
      password: hashedPassword,
      email,
    })

    const savedUser = await user.save()
    res
      .status(201)
      .json({ message: "User created successfully", userId: savedUser._id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /users/signin - User sign-in
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: "Authentication failed" })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    )

    // Respond with user details (omit sensitive information)
    res.json({
      message: "Authentication successful",
      userId: user._id,
      token: token,
      expiresIn: 3600, // 1 hour in seconds
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put(
  "/update",
  authenticateToken,
  validateUserInput,
  async (req, res) => {
    try {
      const userId = req.user.userId // Extracted from JWT in authenticateToken middleware
      const { username, email } = req.body

      // Update user document
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      )
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found." })
      }

      // Return the updated user information (excluding sensitive data like passwords)
      res.status(200).json({
        userId: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Error updating user information." })
    }
  }
)

// DELETE /users/:id - Delete user
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { id } = req.params

    if (userId !== id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this user" })
    }

    // Delete user's job applications first
    await JobApplication.deleteMany({ user: userId })
    console.log("deleted job applications for users")
    // Then delete the user
    await User.findByIdAndDelete(userId)
    res.json({
      message: "User and their job applications deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
