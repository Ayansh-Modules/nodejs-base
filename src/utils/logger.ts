import winston from 'winston'
import Transport from 'winston-transport'
import Configuration from '../configs/app-config'
import Constants from '../constants'
import correlator from '../configs/correlation-id-config'
import validators from './validators'

/**
 * @param level string Filter function will allow logging only this specified log level
 * @returns winston.Logform.Format
 */
const filter = (level: string): winston.Logform.Format => {
    return winston.format((info) => {
        if (info.level === level) {
            return info
        }
        return false
    })()
}

const addCorrelationIdFormatFunction = winston.format((info) => {
    info.correlationId = correlator.getId() || Constants.CORRELATION_ID.NONE
    return info
})

const commonFormatters = [
    addCorrelationIdFormatFunction(),
    winston.format.timestamp(),
    winston.format.printf(({ service, level, correlationId, timestamp, message, ...moreInfo }) => {
        if (validators.isEmptyObject(moreInfo)) {
            return `[${service}] :: ${level} :: ${correlationId} :: ${timestamp} :: ${JSON.stringify(message)}`
        }
        return `[${service}] :: ${level} :: ${correlationId} :: ${timestamp} :: ${JSON.stringify(message)} :: ${JSON.stringify(moreInfo)}`
    })
]

const levels: winston.config.AbstractConfigSetLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    http: 5,
}

const transports: Transport[] = [
    // Log error+ information to a file
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
            winston.format.errors({ stack: true }),
            ...commonFormatters,
        )
    }),
    // Log info+ information to a file
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info',
        format: winston.format.combine(
            ...commonFormatters
        )
    }),
    // Log debug+ information to a file
    new winston.transports.File({
        filename: 'logs/debug.log',
        level: 'debug',
        format: winston.format.combine(
            ...commonFormatters
        )
    }),
    // Log http information to a file
    new winston.transports.File({
        filename: 'logs/http.log',
        level: 'http',
        format: winston.format.combine(
            filter('http'),
            addCorrelationIdFormatFunction(),
            winston.format.timestamp(),
            winston.format.simple()
        ),
    }),
    // Log debug+ information to the console
    new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            ...commonFormatters,
        )
    }),
]

const logger: winston.Logger = winston.createLogger({
    defaultMeta: { service: Configuration.app.SERVICE_NAME },
    levels,
    transports,
    exitOnError: false,
})

export default logger