import { config } from 'dotenv'
import express, { Application } from 'express'
import { connectToMongoDB } from './configs/mongodb-config'
import morgan from './middleware/morgan'
import router from './routes'

config()
connectToMongoDB()

const app: Application = express()

app.use(morgan)

app.use(express.json())

router(app)

export default app