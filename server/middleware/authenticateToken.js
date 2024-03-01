import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Access Denied" })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" })
    req.user = user
    next()
  })
}

export default authenticateToken
