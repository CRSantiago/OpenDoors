// server/index.js
import express from 'express'
import helmet from 'helmet'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import './database.js'
import jobApplicationRoutes from './routes/jobApplications.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = process.env.PORT || 3001

// helmet middleware to secure the app by setting various HTTP headers
app.use(helmet())
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/', (req, res) => res.send('Hello World from OpenDoors Server!'))
app.use(express.json()) // Middleware to parse JSON bodies
app.use('/api/job-applications', jobApplicationRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

export default app
