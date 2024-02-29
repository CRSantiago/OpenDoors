//
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

// POST /users/signup - User sign-up
router.post('/signup', async (req, res) => {
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
      .json({ message: 'User created successfully', userId: savedUser._id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /users/signin - User sign-in
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    // Respond with user details (omit sensitive information)
    res.json({
      message: 'Authentication successful',
      userId: user._id,
      token: token,
      expiresIn: 3600, // 1 hour in seconds
    })
    // Here, you would typically generate and return a token (e.g., JWT)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// DELETE /users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
