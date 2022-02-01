import express, { Application } from 'express'
import { connectToMongoDB } from './configs/mongodb-config'
connectToMongoDB()
import router from './routes'
import morgan from './middleware/morgan'
import correlationIdMiddleware from './middleware/correlation-id'
import { handleErrors, handleUncaughtExceptions, handleUnhandledRejections } from './middleware/handle-error'

const app: Application = express()

app.use(correlationIdMiddleware)
app.use(morgan)

app.use(express.json())

router(app)

app.use(handleErrors)
process.on('unhandledRejection', handleUnhandledRejections)
process.on('uncaughtException', handleUncaughtExceptions)

export default app