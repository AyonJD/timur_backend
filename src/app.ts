import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'
import { sendSuccessResponse } from './shared/customResponse'

// Import routes
import routes from './app/routes/index'

const app: Application = express()

// CORS configuration
const allowedOrigins = [
  'https://blockwinchain.netlify.app',
  'https://blockwinchain-admin.netlify.app',
]

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle CORS preflight requests
app.options('*', cors(corsOptions))

// Testing route
app.get('/', async (req, res, next) => {
  const responseData = {
    message: 'Welcome to Express API template',
    data: null,
  }
  sendSuccessResponse(res, responseData)
})

// All routes here
app.use('/api/v1', routes)

// Global error handler
app.use(globalErrorHandler)

// Forbidden routes
app.all('*', (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: 'false',
    message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
    errorMessages: [
      {
        message: `No API endpoint found for ${req.method} ${req.originalUrl}`,
        path: req.originalUrl,
      },
    ],
    stack: '',
  })
})

export default app
