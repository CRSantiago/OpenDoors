// middleware/validateUserInput.js
import { isValidEmail, isValidUsername } from "../utils/index.js"

const validateUserInput = (req, res, next) => {
  const { email, username } = req.body

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." })
  }

  if (username && !isValidUsername(username)) {
    return res.status(400).json({ message: "Invalid username format." })
  }

  next()
}

export default validateUserInput
