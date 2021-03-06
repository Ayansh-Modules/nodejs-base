import { Router, Application } from 'express'

const router: Router = Router()

export default (app: Application) => {
    app.use('/api', router)
}