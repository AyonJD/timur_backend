import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'

let server: Server

/* This code is setting up a listener for uncaught exception. It's a synchronous process */
process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

/* This code is setting up a listener for unhandled promise rejections. It's a asynchronous process */
process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      console.log(error)
      process.exit(1)
    })
  }
})

/* `process.on('SIGTERM', () => {...})` sets up a listener for the SIGTERM signal, which is a signal
sent to a process to request its termination. When this signal is received, the code inside the
listener function is executed. In this case, if the `server` variable is defined (meaning the server
is running), it is closed and a success message is logged. This is a way to gracefully shut down the
server when the process is terminated, such as when the application is deployed to a cloud platform
and needs to be scaled down or updated. */
process.on('SIGTERM', () => {
  if (server) {
    server.close(() => {
      console.log('Process terminated')
    })
  }
})

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_string as string)
    console.log('Database connected successfully')

    server = app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Error while connecting database: ', error)
  }
}

databaseConnection()
