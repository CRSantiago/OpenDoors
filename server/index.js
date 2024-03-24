// server/index.js
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import './database.js'
import jobApplicationRoutes from './routes/jobApplications.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = process.env.PORT || 3001

// helmet middleware to secure the app by setting various HTTP headers
app.use(helmet())
app.use(cors())
app.use(express.json()) // Middleware to parse JSON bodies

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OpenDoors API',
      version: '1.0.0',
      description: 'OpenDoors API Documentation',
    },
  },
  apis: ['./docs/*.yaml'], // Path to the API docs
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Serve static files from the React app only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/job-applications', jobApplicationRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

export default app
