// middleware/validateUserInput.js
import {
  isValidEmail,
  isValidUsername,
  isPasswordStrong,
} from "../utils/index.js"

const validateUserInput = (req, res, next) => {
  const { email, username, password } = req.body

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." })
  }

  if (username && !isValidUsername(username)) {
    return res.status(400).json({ message: "Invalid username format." })
  }

  // Password strength validation (only if password is provided in the request)
  if (password && !isPasswordStrong(password)) {
    return res
      .status(400)
      .json({ message: "Password does not meet strength requirements." })
  }

  next()
}

export default validateUserInput
