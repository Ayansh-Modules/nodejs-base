import { config } from 'dotenv'
config()
import express, { Application } from 'express'
import { connectToMongoDB } from './configs/mongodb-config'
connectToMongoDB()
import router from './routes'
import morgan from './middleware/morgan'
import correlationIdMiddleware from './middleware/correlation-id'

const app: Application = express()

app.use(correlationIdMiddleware)
app.use(morgan)

app.use(express.json())

router(app)

export default app