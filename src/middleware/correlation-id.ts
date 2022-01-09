import { NextFunction, Request, Response } from 'express'
import correlator from '../configs/correlation-id-config'
import Configuration from '../configs/app-configuration'

const correlationIdKey = Configuration.app.CORRELATION_ID_KEY

function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
    correlator.bindEmitter(req)
    correlator.bindEmitter(res)
    correlator.bindEmitter(req.socket)

    correlator.withId(() => {
        const currentCorrelationId = correlator.getId()
        res.set(correlationIdKey, currentCorrelationId)
        next()
    }, req.get(correlationIdKey))
}

export default correlationIdMiddleware