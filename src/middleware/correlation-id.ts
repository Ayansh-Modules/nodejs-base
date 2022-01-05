import correlator from '../configs/correlation-id-config'
import { NextFunction, Request, Response } from 'express'

const correlationIdKey = process.env.CORRELATION_ID_KEY || process.exit(1)

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