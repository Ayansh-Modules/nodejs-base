import { NextFunction, Request, Response } from 'express'
import BaseError from '../errors/base-error'
import logger from '../utils/logger'

const logError = async (err: Error) => {
    if (err instanceof BaseError) {
        const  {name, httpCode, isOperational, message} = err
        logger.error(`${isOperational? 'Operational' : 'Non-operational'} error "${name}" with statusCode "${httpCode}" & message "${message}" occured! ${err}`)
    } else {
        const { message, name } = err
        logger.error(`Error "${name}" with statusCode "500" & message "${message}" occured! ${err}`)
    }
}

const handleErrors = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error occured for request ${req?.method} ${req?.path}`)
    await logError(err)
    let errorName
    let errorMessage
    let httpStatusCode
    if (err instanceof BaseError) {
        const  {name, httpCode, isOperational, message} = err
        if (isOperational === false) {
            process.exit(1)
        }
        errorName = name
        errorMessage = message
        httpStatusCode = httpCode
    } else {
        const { message, name } = err
        errorName = name
        errorMessage = message
        httpStatusCode = 500
    }
    res.status(httpStatusCode).json({
        error: {
            name: errorName,
            message: errorMessage
        }
    })
    next()
}

const handleUncaughtExceptions = async (err: Error, origin: NodeJS.UncaughtExceptionOrigin) => {
    logger.error(`Uncaught Exception at origin ${origin}`)
    await logError(err)

    if (err instanceof BaseError && err.isOperational === false) {
        process.exit(1)
    }
}

const handleUnhandledRejections = async (reason: unknown, promise: Promise<unknown>) => {
    logger.error(`Uncaught promise failed :: ${promise}`)
    throw reason
}

export {
    logError,
    handleErrors,
    handleUncaughtExceptions,
    handleUnhandledRejections
}